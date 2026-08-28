import { useState } from "react";
import { useLanguage } from "../../hooks/useLanguage.js";
import { supabase, isSupabaseConfigured } from "../../config/supabase.js";
import LanguageToggle from "./LanguageToggle.jsx";
import ContactForm from "../contact/ContactForm.jsx";

// Full-window gate: covers the entire app. Nothing else mounts while this is
// showing — no nav, no routes, no shop.
//
// Three modes:
//  - "signup" (default, what every visitor sees): submitting an email
//    writes it to Supabase's "signups" table for the newsletter. This does
//    NOT unlock the site — it's a lead-capture form, not an entry form.
//  - "login" (reached via the small link below the form): only the site
//    owner has real credentials here. A successful Supabase Auth sign-in
//    is the only way `onUnlock()` gets called.
//  - "contact" (reached via the small link below the form): the same
//    ContactForm used on the real /contact page, embedded here because the
//    gate blocks all routing while locked — there's no other way to reach
//    it pre-unlock. Lets visitors reach out (e.g. custom/made-to-order
//    requests with reference images) without needing to sign up first.
// Toggle SITE_GATE_ENABLED in config/features.js to disable the gate
// entirely once you're ready to launch for real.
const inputClass =
  "flex-1 bg-transparent border-b border-black/30 focus:border-black outline-none px-1 py-3 text-[13px] placeholder:text-black/30";

const GateOverlay = ({ onUnlock }) => {
  const { t } = useLanguage();
  const [mode, setMode] = useState("signup"); // "signup" | "login" | "contact"

  const [email, setEmail] = useState("");
  const [signupStatus, setSignupStatus] = useState("idle"); // idle | submitting | done | error

  const [loginEmail, setLoginEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("idle"); // idle | submitting | error

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !isSupabaseConfigured) return;

    setSignupStatus("submitting");
    // Plain insert, not upsert: with RLS, an upsert that specifies
    // onConflict needs a SELECT policy too (Postgres has to check for an
    // existing conflicting row), which would mean letting anyone read the
    // whole signups table via the API — not something we want for a list of
    // emails. Instead, insert normally and treat a unique-violation error
    // (code 23505 — this email is already in the table, enforced by the
    // unique constraint on the email column) as a quiet success rather than
    // showing an error.
    const { error } = await supabase.from("signups").insert({ email });
    setSignupStatus(error && error.code !== "23505" ? "error" : "done");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginEmail || !password || !isSupabaseConfigured) return;

    setLoginStatus("submitting");
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password,
    });
    if (error) {
      setLoginStatus("error");
      return;
    }
    onUnlock();
  };

  return (
    <div className="fixed inset-0 z-[999] bg-white text-black flex items-center justify-center px-5 py-16 overflow-y-auto">
      <div className="absolute top-5 right-5">
        <LanguageToggle variant="light" />
      </div>

      <div className="max-w-sm w-full text-center my-auto">
        <p className="text-[13px] font-bold uppercase tracking-widest2">
          {t("gate.brand")}
        </p>

        {mode === "contact" ? (
          <>
            <p className="text-[11px] uppercase tracking-widest2 text-black/40 mt-6 mb-8">
              {t("gate.contactHeading")}
            </p>

            <div className="text-left">
              <ContactForm />
            </div>

            <button
              type="button"
              onClick={() => setMode("signup")}
              className="text-[10px] uppercase tracking-widest2 text-black/30 hover:text-black underline mt-8"
            >
              {t("gate.backToSignup")}
            </button>
          </>
        ) : mode === "signup" ? (
          <>
            <p className="text-[11px] uppercase tracking-widest2 text-black/40 mt-6">
              {t("gate.heading")}
            </p>

            {signupStatus === "done" ? (
              <p className="text-[11px] uppercase tracking-widest2 text-black/70 mt-10">
                {t("gate.thankYou")}
              </p>
            ) : (
              <form onSubmit={handleSignup} className="mt-10 flex">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("gate.emailPlaceholder")}
                  className={inputClass}
                />
                <button
                  type="submit"
                  disabled={signupStatus === "submitting"}
                  className="text-[11px] uppercase tracking-widest2 px-4 border-b border-black/30 hover:border-black transition-colors disabled:opacity-40"
                >
                  {signupStatus === "submitting"
                    ? t("gate.submitting")
                    : t("gate.submit")}
                </button>
              </form>
            )}

            {signupStatus === "error" && (
              <p className="text-[10px] uppercase tracking-widest2 text-black/40 mt-4">
                {t("gate.signupError")}
              </p>
            )}

            <p className="text-[10px] uppercase tracking-widest2 text-black/20 mt-6">
              {t("gate.inviteOnly")}
            </p>

            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                type="button"
                onClick={() => setMode("contact")}
                className="text-[10px] uppercase tracking-widest2 text-black/30 hover:text-black underline"
              >
                {t("gate.contactLink")}
              </button>
              <span className="text-black/20">·</span>
              <button
                type="button"
                onClick={() => setMode("login")}
                className="text-[10px] uppercase tracking-widest2 text-black/30 hover:text-black underline"
              >
                {t("gate.loginLink")}
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-[11px] uppercase tracking-widest2 text-black/40 mt-6">
              {t("gate.loginHeading")}
            </p>

            <form onSubmit={handleLogin} className="mt-10 space-y-4">
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder={t("gate.emailPlaceholder")}
                className={`${inputClass} w-full block`}
              />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("gate.password")}
                className={`${inputClass} w-full block`}
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

            <button
              type="button"
              onClick={() => setMode("signup")}
              className="text-[10px] uppercase tracking-widest2 text-black/30 hover:text-black underline mt-8"
            >
              {t("gate.backToSignup")}
            </button>
          </>
        )}

        {!isSupabaseConfigured && (
          <p className="text-[9px] uppercase tracking-widest2 text-black/20 mt-8">
            {t("gate.notConfigured")}
          </p>
        )}
      </div>
    </div>
  );
};

export default GateOverlay;
