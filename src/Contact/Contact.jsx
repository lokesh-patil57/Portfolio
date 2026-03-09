import React, { Suspense, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import TitleHeader from "../components/TitleHeader/TitleHeader";
import SectionFallback from "../components/Loading/SectionFallback";
import { useIsMobile } from "../hooks/useIsMobile";
const ContactExperience = React.lazy(
  () => import("../components/Models/Contact/ContactExperience"),
);

const Contact = ({ isDark = true, t = {} }) => {
  const formRef = useRef(null);
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    from_name: "",
    from_email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading state

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
      );
      alert("Message sent successfully 🚀");
      // Reset form and stop loading
      setForm({ from_name: "", from_email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error); // Optional: show toast
    } finally {
      setLoading(false); // Always stop loading, even on error
    }
  };

  return (
    <section
      id="contact"
      className="flex-center section-padding transition-colors duration-500"
      style={{ backgroundColor: t.background || "#000000" }}
    >
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Get in Touch – Let's Connect"
          sub="💬 Have questions or ideas? Let's talk! 🚀"
          isDark={isDark}
          t={t}
        />
        <div className="grid-12-cols mt-16">
          <div className="xl:col-span-5">
            <div
              className={`flex-center card-border rounded-xl p-10 transition-colors duration-500 ${isDark ? "bg-black-100" : ""}`}
              style={{
                backgroundColor: isDark ? undefined : "#ffffff",
                borderColor:
                  t.counterBorder || (isDark ? "#1c1c21" : "rgba(0,0,0,0.1)"),
              }}
            >
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-7"
              >
                <div>
                  <label
                    htmlFor="name"
                    style={{ color: isDark ? "#ffffff" : "#000000" }}
                  >
                    Your name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="from_name"
                    value={form.from_name}
                    onChange={handleChange}
                    placeholder="What's your good name?"
                    required
                    style={{
                      backgroundColor: isDark ? "#2d2d38" : "#f0f4f8",
                      color: t.textPrimary || (isDark ? "#ffffff" : "#0f172a"),
                      borderColor: isDark ? "#1c1c21" : "rgba(0,0,0,0.1)",
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    style={{ color: isDark ? "#ffffff" : "#000000" }}
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="from_email"
                    value={form.from_email}
                    onChange={handleChange}
                    placeholder="What's your email address?"
                    required
                    style={{
                      backgroundColor: isDark ? "#2d2d38" : "#f0f4f8",
                      color: t.textPrimary || (isDark ? "#ffffff" : "#0f172a"),
                      borderColor: isDark ? "#1c1c21" : "rgba(0,0,0,0.1)",
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    style={{ color: isDark ? "#ffffff" : "#000000" }}
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can I help you?"
                    rows="5"
                    required
                    style={{
                      backgroundColor: isDark ? "#2d2d38" : "#f0f4f8",
                      color: t.textPrimary || (isDark ? "#ffffff" : "#0f172a"),
                      borderColor: isDark ? "#1c1c21" : "rgba(0,0,0,0.1)",
                    }}
                  />
                </div>

                <button type="submit">
                  <div
                    className="cta-button group"
                    style={{
                      transform: isMobile ? "scale(0.88)" : "scale(1)",
                      transformOrigin: "left center",
                    }}
                  >
                    <div className="bg-circle" />
                    <p className="text">
                      {loading ? "Sending..." : isMobile ? "SEND" : "Send Message"}
                    </p>
                    <div className="arrow-wrapper">
                      <img
                        src="/images/arrow-down.svg"
                        alt="arrow"
                        loading="lazy"
                        decoding="async"
                        width={isMobile ? 16 : 20}
                        height={isMobile ? 16 : 20}
                      />
                    </div>
                  </div>
                </button>
              </form>
            </div>
          </div>
          <div className="xl:col-span-7 min-h-96">
            <div className="bg-[#cd7c2e] w-full h-full hover:cursor-grab rounded-3xl overflow-hidden">
              {/* Perf: delay WebGL chunk until this section is mounted. */}
              <Suspense fallback={<SectionFallback />}>
                <ContactExperience isDark={isDark} t={t} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Contact);
