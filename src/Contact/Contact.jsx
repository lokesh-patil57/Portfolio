import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import TitleHeader from "../components/TitleHeader/TitleHeader";
import ContactExperience from "../components/Models/Contact/ContactExperience";

const Contact = ({ isDark = true, t = {} }) => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
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
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );

      // Reset form and stop loading
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error); // Optional: show toast
    } finally {
      setLoading(false); // Always stop loading, even on error
    }
  };

  return (
    <section id="contact" className="flex-center section-padding transition-colors duration-500" style={{ backgroundColor: t.background || "#000000" }}>
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Get in Touch – Let's Connect"
          sub="💬 Have questions or ideas? Let's talk! 🚀"
          isDark={isDark}
          t={t}
        />
        <div className="grid-12-cols mt-16">
          <div className="xl:col-span-5">
            <div className="flex-center card-border rounded-xl p-10 transition-colors duration-500" style={{ backgroundColor: isDark ? "#0e0e10" : "#ffffff", borderColor: t.counterBorder || (isDark ? "#1c1c21" : "rgba(0,0,0,0.1)") }}>
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-7"
              >
                <div>
                  <label htmlFor="name" style={{ color: "#000000" }}>Your name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What's your good name?"
                    required
                    style={{ backgroundColor: isDark ? "#2d2d38" : "#f0f4f8", color: t.textPrimary || (isDark ? "#ffffff" : "#0f172a"), borderColor: isDark ? "#1c1c21" : "rgba(0,0,0,0.1)" }}
                  />
                </div>

                <div>
                  <label htmlFor="email" style={{ color: "#000000" }}>Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="What's your email address?"
                    required
                    style={{ backgroundColor: isDark ? "#2d2d38" : "#f0f4f8", color: t.textPrimary || (isDark ? "#ffffff" : "#0f172a"), borderColor: isDark ? "#1c1c21" : "rgba(0,0,0,0.1)" }}
                  />
                </div>

                <div>
                  <label htmlFor="message" style={{ color: "#000000" }}>Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can I help you?"
                    rows="5"
                    required
                    style={{ backgroundColor: isDark ? "#2d2d38" : "#f0f4f8", color: t.textPrimary || (isDark ? "#ffffff" : "#0f172a"), borderColor: isDark ? "#1c1c21" : "rgba(0,0,0,0.1)" }}
                  />
                </div>

                <button type="submit">
                  <div className="cta-button group">
                    <div className="bg-circle" />
                    <p className="text">
                      {loading ? "Sending..." : "Send Message"}
                    </p>
                    <div className="arrow-wrapper">
                      <img src="/images/arrow-down.svg" alt="arrow" />
                    </div>
                  </div>
                </button>
              </form>
            </div>
          </div>
          <div className="xl:col-span-7 min-h-96">
            <div className="bg-[#cd7c2e] w-full h-full hover:cursor-grab rounded-3xl overflow-hidden">
              <ContactExperience isDark={isDark} t={t} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;