'use client'
export default function OnTheFeed() {
  const videos = [
    {
      id: 1,
      url: 'https://www.instagram.com/reel/DSUEIeBDAmg/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
      thumbnail: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=600&fit=crop'
    },
    {
      id: 2,
      url: 'https://www.w3schools.com/html/movie.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop'
    },
    {
      id: 3,
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=600&fit=crop'
    },
    {
      id: 4,
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=400&h=600&fit=crop'
    },
    {
      id: 5,
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=600&fit=crop'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 tracking-tight">
            ON THE FEED
          </h2>
          <p className="text-gray-600 text-lg">See what our community is wearing</p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {videos.map((video) => (
            <div
              key={video.id}
              className="group relative aspect-3/4 rounded-xl overflow-hidden bg-gray-100 cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Video Element */}
              <video
                className="absolute inset-0 w-full h-full object-cover"
                src={video.url}
                loop
                muted
                playsInline
                autoPlay
                onMouseEnter={(e) => e.target.play()}
                onMouseLeave={(e) => {
                  e.target.pause();
                  e.target.currentTime = 0;
                }}
              />

              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />

              {/* Play Icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 rounded-full bg-white bg-opacity-90 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-black ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Bottom Gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-10">
          <button className="px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors">
            View More on Instagram
          </button>
        </div>
      </div>
    </section>
  );
}