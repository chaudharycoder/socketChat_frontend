import React, { useState } from 'react';

const Avatar = ({ src, name, size = "w-12", isOnline, className = "", imgClassName = "" }) => {
    const [imgError, setImgError] = useState(false);

    // Extract initials - handle empty strings or spaces
    const cleanName = name?.trim() || "";
    const initial = cleanName ? cleanName.charAt(0).toUpperCase() : "?";

    const hSize = size.replace('w-', 'h-');

    return (
        <div className={`avatar ${isOnline ? 'online' : ''} ${className}`}>
            <div className={`${size} ${hSize} rounded-xl bg-white/5 flex items-center justify-center overflow-hidden border border-white/10 backdrop-blur-sm transition-transform duration-200 ${imgClassName}`}>
                {!imgError && src ? (
                    <img
                        src={src}
                        alt={name}
                        onError={() => setImgError(true)}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full">
                        <span className="text-sm font-black text-white/50 select-none leading-none">
                            {initial}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Avatar;
