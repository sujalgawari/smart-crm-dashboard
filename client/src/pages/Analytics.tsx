function Analytics() {

  return (

    <div className="min-h-screen bg-[#F4F7FE] p-10">

      <div className="bg-white rounded-[30px] shadow-xl p-10">

        <h1 className="text-5xl font-bold text-[#111827] mb-5">
          Analytics Dashboard 📊
        </h1>

        <p className="text-gray-500 text-xl mb-10">
          Advanced analytics features are under development.
        </p>

        <div className="grid grid-cols-3 gap-6">

          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-3xl p-8 shadow-xl">

            <h2 className="text-2xl font-bold mb-3">
              Revenue Analytics
            </h2>

            <p className="text-white/80">
              Coming Soon
            </p>

          </div>

          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-3xl p-8 shadow-xl">

            <h2 className="text-2xl font-bold mb-3">
              Conversion Rate
            </h2>

            <p className="text-white/80">
              Coming Soon
            </p>

          </div>

          <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-3xl p-8 shadow-xl">

            <h2 className="text-2xl font-bold mb-3">
              Team Performance
            </h2>

            <p className="text-white/80">
              Coming Soon
            </p>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Analytics;