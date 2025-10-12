
import { motion } from "motion/react"

function App() {

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          duration: 1.5
        }}
        className="bg-white/40 backdrop-blur-sm w-full max-w-6xl h-auto flex flex-col lg:flex-row justify-center items-center p-4 md:p-6 rounded-2xl shadow-2xl border border-white/60 gap-4 lg:gap-0"
      >
        <div className="bg-white flex flex-col w-full p-4 sm:p-6 md:p-8 gap-4 md:gap-6 rounded-xl shadow-lg border border-gray-200">
          {/* Título */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02, color: "#16a34a" }}
            className="text-4xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 transition-all duration-300 cursor-pointer select-none text-center"
          >
            CafeBuy Technologies
          </motion.h1>

          {/* Descripción */}
          <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed text-center px-2">
            Suite completa para <strong className="text-green-600">hostelería moderna</strong>: optimiza pedidos, pagos y flujo de caja con <strong className="text-green-600">analíticas en tiempo real</strong> e informes automáticos.
          </p>

          {/* Visualización de cards mejoradas */}
          <div className="flex flex-col md:flex-row w-full gap-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="flex-1 bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-300 min-h-56 sm:h-64 rounded-xl shadow-lg transition-all p-4 sm:p-6 flex flex-col justify-between"
            >
              <div>
                <div className="text-4xl mb-3">📊</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Analytics Dashboard</h3>
                <p className="text-gray-600 text-xs sm:text-sm">Visualiza métricas clave en tiempo real y toma decisiones informadas.</p>
              </div>
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="flex-1 bg-gradient-to-br from-green-100 to-green-200 border-2 border-green-300 min-h-56 sm:h-64 rounded-xl shadow-lg transition-all p-4 sm:p-6 flex flex-col justify-between"
            >
              <div>
                <div className="text-4xl mb-3">🚀</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Sistema Integrado</h3>
                <p className="text-gray-600 text-xs sm:text-sm">Apps para clientes, empleados y administración en una sola plataforma.</p>
              </div>
              <div className="flex gap-2">
                <div className="px-2 py-1 bg-green-600 text-white text-xs rounded-full">Cliente</div>
                <div className="px-2 py-1 bg-green-600 text-white text-xs rounded-full">Staff</div>
                <div className="px-2 py-1 bg-green-600 text-white text-xs rounded-full">Admin</div>
              </div>
            </motion.div>
          </div>

        </div>
        <div className="flex w-full lg:w-auto lg:min-w-64 justify-center items-center flex-col gap-3 md:gap-4 p-4 md:p-6">
          <motion.div
            animate={{ rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <h3 className="text-4xl sm:text-5xl">🏗️</h3>
          </motion.div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 text-center">Lanzamiento próximo</h3>
          
          {/* Barra de progreso mejorada */}
          <div className="w-full max-w-xs">
            <div className="relative w-full h-3 bg-gray-300 rounded-full overflow-hidden shadow-inner">
              <motion.div
                className="absolute left-0 top-0 h-3 bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "99%" }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.div>
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
              <span className="font-semibold">Cargando...</span>
              <span className="font-bold text-green-600">99%</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default App