import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import { T } from "../constants/theme";

const ResumeView = ({ isDark }) => {
    const t = isDark ? T.dark : T.light;
    const resumePath = "/Resume/Lokesh Patil.pdf";

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen pt-28 pb-12 px-4 flex flex-col items-center"
            style={{ backgroundColor: t.background, color: t.textPrimary }}
        >
            <div className="max-w-5xl w-full flex flex-col gap-6">
                {/* Header Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 z-10">
                    <Link to="/">
                        <motion.button
                            whileHover={{ x: -5 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors"
                            style={{
                                background: t.itemBg,
                                borderColor: t.itemBorder,
                                color: t.textPrimary,
                                backdropFilter: "blur(10px)",
                            }}
                        >
                            <ArrowLeft size={18} />
                            <span>Back to Portfolio</span>
                        </motion.button>
                    </Link>

                    <div className="flex items-center gap-3">
                        <a
                            href={resumePath}
                            download="Lokesh_Patil_Resume.pdf"
                            className="no-underline"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg"
                                style={{
                                    background: isDark
                                        ? "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)"
                                        : "linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)",
                                    color: isDark ? "#0c4a6e" : "#ffffff",
                                }}
                            >
                                <Download size={20} />
                                <span>Download PDF</span>
                            </motion.button>
                        </a>
                    </div>
                </div>

                {/* Resume Preview */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                    className="relative w-full aspect-[1/1.414] rounded-3xl overflow-hidden border shadow-2xl"
                    style={{
                        borderColor: t.navBorder,
                        background: t.navBg,
                        backdropFilter: "blur(20px)",
                        boxShadow: t.navShadow,
                    }}
                >
                    <iframe
                        src={`${resumePath}#toolbar=0`}
                        className="w-full h-full border-none"
                        title="Lokesh Patil Resume"
                    />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default ResumeView;
