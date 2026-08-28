import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../config/supabase.js";
import { useLanguage } from "../hooks/useLanguage.js";
import { formatPrice } from "../utils/formatPrice.js";

// Hidden owner page — not linked anywhere in the nav/footer, reachable only
// by typing /admin. Has its own Supabase Auth login (same owner account
// used by GateOverlay's "Log in" link) so it works whether or not the
// site-wide gate is currently enabled — once SITE_GATE_ENABLED is turned
// off for a real launch, this page still requires a real login before
// showing anything.
//
// Reads the "orders" table directly with the anon/publishable client. That
// only works because of a SELECT policy scoped to the `authenticated` role
// (see the project setup notes for the exact SQL) — nobody without a real
// Supabase Auth session (i.e. nobody but the owner, since there's no public
// sign-up flow) can read this table. Writing orders still only happens
// server-side via the service_role key (see server/index.js /confirm-order)
// — this page is read-only.
const inputClass =
  "w-full border-b border-black/20 focus:border-black outline-none px-1 py-3 text-[13px] bg-transparent";

const Admin = () => {
  const { t, language } = useLanguage();
  const [session, setSession] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("idle"); // idle | submitting | error

  const [orders, setOrders] = useState([]);
  const [ordersStatus, setOrdersStatus] = useState("idle"); // idle | loading | loaded | error

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setCheckingSession(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setCheckingSession(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => setSession(newSession)
    );
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    setOrdersStatus("loading");
    supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          setOrdersStatus("error");
          return;
        }
        setOrders(data ?? []);
        setOrdersStatus("loaded");
      });
  }, [session]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password || !isSupabaseConfigured) return;
    setLoginStatus("submitting");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoginStatus(error ? "error" : "idle");
  };

  const handleLogout = () => supabase.auth.signOut();

  if (checkingSession) return null;

  if (!isSupabaseConfigured) {
    return (
      <div className="px-5 py-24 text-center">
        <p className="text-[11px] uppercase tracking-widest2 text-black/50">
          {t("gate.notConfigured")}
        </p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="max-w-sm mx-auto px-5 py-24 text-center">
        <p className="text-[11px] uppercase tracking-widest2 text-black/50 mb-10">
          {t("admin.loginHeading")}
        </p>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("gate.emailPlaceholder")}
            className={inputClass}
          />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("gate.password")}
            className={inputClass}
          />
          <button
            type="submit"
            disabled={loginStatus === "submitting"}
            className="w-full text-[11px] uppercase tracking-widest2 py-3.5 bg-black text-white hover:bg-black/80 transition-colors disabled:opacity-40"
          >
            {loginStatus === "submitting"
              ? t("gate.submitting")
              : t("gate.login")}
          </button>
        </form>
        {loginStatus === "error" && (
          <p className="text-[10px] uppercase tracking-widest2 text-black/40 mt-4">
            {t("gate.loginError")}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-5 py-16">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-[11px] uppercase tracking-widest2 text-black/50">
          {t("admin.title")} ({orders.length})
        </h1>
        <button
          onClick={handleLogout}
          className="text-[10px] uppercase tracking-widest2 underline text-black/40 hover:text-black"
        >
          {t("admin.logout")}
        </button>
      </div>

      {ordersStatus === "loading" && (
        <p className="text-[11px] uppercase tracking-widest2 text-black/40">
          …
        </p>
      )}

      {ordersStatus === "error" && (
        <p className="text-[11px] uppercase tracking-widest2 text-black/40">
          {t("admin.loadError")}
        </p>
      )}

      {ordersStatus === "loaded" && orders.length === 0 && (
        <p className="text-[11px] uppercase tracking-widest2 text-black/40">
          {t("admin.noOrders")}
        </p>
      )}

      <div className="space-y-8">
        {orders.map((order) => {
          const currency = (order.currency || "EUR").toUpperCase();
          return (
            <div key={order.id} className="border border-black/10 p-5">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-5 pb-4 border-b border-black/10">
                <p className="text-[11px] uppercase tracking-widest2">
                  {new Date(order.created_at).toLocaleString(
                    language === "sk" ? "sk-SK" : "en-US"
                  )}
                </p>
                <p className="text-[10px] uppercase tracking-widest2 text-black/40">
                  {order.status}
                </p>
                <p className="text-[13px] uppercase tracking-widest2">
                  {formatPrice(order.total, currency, language)}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mb-5 text-[11px]">
                <div>
                  <p className="uppercase tracking-widest2 text-black/30 mb-1">
                    {t("checkout.contact")}
                  </p>
                  <p>
                    {order.first_name} {order.last_name}
                  </p>
                  <p className="text-black/50">{order.email}</p>
                  <p className="text-black/50">{order.phone}</p>
                </div>
                <div>
                  <p className="uppercase tracking-widest2 text-black/30 mb-1">
                    {t("checkout.delivery")}
                  </p>
                  <p>{order.shipping_label || order.shipping_method}</p>
                  {order.pickup_point && (
                    <p className="text-black/50">
                      {order.pickup_point.name}, {order.pickup_point.address},{" "}
                      {order.pickup_point.city}
                    </p>
                  )}
                  {order.gls_address && (
                    <p className="text-black/50">
                      {order.gls_address.street}, {order.gls_address.city}{" "}
                      {order.gls_address.postalCode},{" "}
                      {order.gls_address.country}
                    </p>
                  )}
                </div>
              </div>

              <div className="divide-y divide-black/10 border-t border-black/10">
                {(order.items ?? []).map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-3 py-2 text-[11px]"
                  >
                    <p className="uppercase tracking-widest2">
                      {item.code}
                      {item.size ? ` · ${item.size}` : ""}
                      {item.color ? ` · ${item.color}` : ""}
                    </p>
                    <p className="text-black/50 shrink-0">
                      {item.kind === "material"
                        ? `${item.quantity} ${t("material.unit")}`
                        : `${t("cart.qty")} ${item.quantity}`}
                    </p>
                    <p className="shrink-0">
                      {formatPrice(
                        item.lineTotal,
                        (item.currency || currency).toUpperCase(),
                        language
                      )}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-[11px] text-black/60 mt-3 pt-3 border-t border-black/10">
                <p>{t("checkout.subtotal")}</p>
                <p>{formatPrice(order.subtotal, currency, language)}</p>
              </div>
              <div className="flex justify-between text-[11px] text-black/60">
                <p>{t("checkout.shippingLabel")}</p>
                <p>
                  {order.shipping_price > 0
                    ? formatPrice(order.shipping_price, currency, language)
                    : "—"}
                </p>
              </div>

              {order.order_note && (
                <p className="text-[11px] text-black/50 mt-4">
                  {t("checkout.orderNote")}: {order.order_note}
                </p>
              )}

              <p className="text-[9px] uppercase tracking-widest2 text-black/20 mt-4">
                {order.stripe_payment_intent_id}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Admin;
