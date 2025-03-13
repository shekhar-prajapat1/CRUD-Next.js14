export default function Footer() {
    return (
        <footer className="w-full bg-gray-900 text-white text-center p-6 mt-6 shadow-lg border-t border-gray-700">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-xl font-bold">👨‍💻 Shekhar Prajapat</h2>
                <p className="text-sm opacity-80 mt-1">Aspiring Software Engineer | Full Stack Developer | AI Enthusiast</p>

                <p className="mt-2 text-sm">
                    🚀 Computer Science Engineering Student at <strong>NIT Warangal</strong> <br />
                    💡 Passionate about <strong>Full-Stack Development, Software Engineering, and Artificial Intelligence</strong>. <br />
                    🔍 Exploring <strong>Node.js, Next.js, React, SQL, MongoDB, and AI Technologies</strong>.  
                </p>

                <div className="mt-4 flex justify-center space-x-4">
                    <a 
                        href="https://github.com/shekhar-prajapat1" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-400 hover:underline text-sm flex items-center space-x-1"
                    >
                        <span>🌐 GitHub</span>
                    </a> 
                    <span className="text-gray-500">|</span>
                    <a 
                        href="https://linkedin.com/in/shekhar-prajapat-92576a210" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-400 hover:underline text-sm flex items-center space-x-1"
                    >
                        <span>🔗 LinkedIn</span>
                    </a> 
                    <span className="text-gray-500">|</span>
                    <a 
                        href="mailto:shekharprajapat779@gmail.com" 
                        className="text-blue-400 hover:underline text-sm flex items-center space-x-1"
                    >
                        <span>📩 Email</span>
                    </a>
                </div>

                <div className="mt-4 text-sm">
                    📍 <strong>Location:</strong> Rajasthan, India <br />
                    📞 <strong>Contact:</strong> +91 8000819137  
                </div>
            </div>
        </footer>
    );
}
