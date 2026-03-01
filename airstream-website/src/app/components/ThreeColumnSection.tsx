export function ThreeColumnSection() {
  return (
    <section className="w-full px-4 py-8 md:py-12">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* First Column - 50% width on large screens */}
          <div className="w-full lg:w-1/2 bg-gray-900 rounded-[10px] border-[3px] border-gray-400 p-6 min-h-[300px]">
            <h2 className="text-2xl font-bold text-white mb-4">Column 1</h2>
            <p className="text-gray-200">
              This column takes up 50% of the page width on larger screens.
            </p>
          </div>

          {/* Right Side Container - 50% width on large screens */}
          <div className="w-full lg:w-1/2 flex flex-col md:flex-row gap-6">
            {/* Second Column - 25% of total page width */}
            <div className="w-full md:w-1/2 bg-gray-900 rounded-[10px] border-[3px] border-gray-400 p-6 min-h-[300px]">
              <h2 className="text-2xl font-bold text-white mb-4">Column 2</h2>
              <p className="text-gray-200">
                This column takes up 25% of the page width on larger screens.
              </p>
            </div>

            {/* Third Column - 25% of total page width */}
            <div className="w-full md:w-1/2 bg-gray-900 rounded-[10px] border-[3px] border-gray-400 p-6 min-h-[300px]">
              <h2 className="text-2xl font-bold text-white mb-4">Column 3</h2>
              <p className="text-gray-200">
                This column takes up 25% of the page width on larger screens.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}