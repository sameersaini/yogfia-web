import React from "react";

const YoutubeEmbed: React.FC<{embedId: string}> = ({ embedId }) => (
    <div className="video-responsive">
        <iframe
            src={`https://www.youtube.com/embed/${embedId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
        />
    </div>
);

export default YoutubeEmbed;
