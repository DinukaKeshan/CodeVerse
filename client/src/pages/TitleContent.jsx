import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTimeline } from "../services/timeline";

const getYouTubeEmbedUrl = (url) => {
  try {
    const videoIdMatch = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\s&?]+)/
    );
    if (videoIdMatch && videoIdMatch[1]) {
      return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
    }
  } catch (err) {
    console.error("Invalid YouTube URL", url);
  }
  return null;
};

const TitleContent = () => {
  const { courseId, timelineId } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const all = await getTimeline(courseId);
        const found = all.find((t) => t._id === timelineId);
        setItem(found);
      } catch (error) {
        console.error("Failed to load timeline item", error);
      }
    };
    fetchItem();
  }, [courseId, timelineId]);

  if (!item) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{item.title}</h2>

      {item.videos.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-2">Videos</h4>
          <div className="space-y-4">
            {item.videos.map((v, i) => {
              const embedUrl = getYouTubeEmbedUrl(v);
              return embedUrl ? (
                <iframe
                  key={i}
                  src={embedUrl}
                  className="w-full h-64 rounded shadow"
                  title={`Video-${i}`}
                  allowFullScreen
                ></iframe>
              ) : (
                <p key={i} className="text-red-500">
                  Invalid YouTube URL
                </p>
              );
            })}
          </div>
        </div>
      )}

      {item.pdfs.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold mb-2">PDFs</h4>
          <ul className="list-disc list-inside space-y-1 text-green-700">
            {item.pdfs.map((p, i) => (
              <li key={i}>
                <a href={p} target="_blank" rel="noopener noreferrer">
                  {p}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TitleContent;
