import { useState } from "react";

// Fully client-side — no backend call. Subscribe state lives in this
// component via useState, matching the "activate with one click" request:
// submitting the form flips `subscribed` to true and swaps in a confirmation.
const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <section className="bg-black text-white">
      <div className="max-w-md mx-auto px-5 py-20 text-center">
        <p className="text-[11px] uppercase tracking-widest2 text-white/40">
          Newsletter
        </p>
        <h2 className="text-[13px] uppercase tracking-widest2 mt-3">
          Be first to know
        </h2>

        {subscribed ? (
          <p className="text-[11px] uppercase tracking-widest2 text-white/70 mt-10">
            You&apos;re on the list.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 flex">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="flex-1 bg-transparent border-b border-white/30 focus:border-white outline-none px-1 py-3 text-[13px] placeholder:text-white/30"
            />
            <button
              type="submit"
              className="text-[11px] uppercase tracking-widest2 px-4 border-b border-white/30 hover:border-white transition-colors"
            >
              Join
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
