import React, { useState } from 'react';
import { SOCIAL_POSTS } from '../data/socialData';
import { SocialPost } from '../types';
import { Heart, Instagram, MessageCircle, Share2, Sparkles, ExternalLink } from 'lucide-react';

export const SocialSection: React.FC = () => {
  const [posts, setPosts] = useState<SocialPost[]>(SOCIAL_POSTS);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [activePost, setActivePost] = useState<SocialPost | null>(null);

  const toggleLike = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isLiked = !!likedMap[postId];
    setLikedMap((prev) => ({ ...prev, [postId]: !isLiked }));
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, likes: isLiked ? p.likes - 1 : p.likes + 1 } : p
      )
    );
  };

  return (
    <section id="social" className="py-16 sm:py-24 bg-[#FFF8ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#FF3E3E] text-white px-4 py-1 rounded-full border-2 border-black font-display font-bold text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rotate-[1deg]">
            <Instagram className="w-3.5 h-3.5 text-[#FFD12F]" />
            <span>INSTAGRAM SLURP WALL</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-black tracking-tight">
            SPOTTED: BOWL & BROTH 👀
          </h2>

          <p className="text-base sm:text-lg text-neutral-700 font-medium">
            Tagged by hungry students, late-night campus crews and food creators across 40+ universities. Tag @bowlandbroth to be featured.
          </p>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => {
            const isLiked = !!likedMap[post.id];
            return (
              <div
                key={post.id}
                id={`social-card-${post.id}`}
                onClick={() => setActivePost(post)}
                className="bg-white rounded-3xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all overflow-hidden flex flex-col justify-between cursor-pointer group"
              >
                {/* Post Header */}
                <div className="p-3.5 flex items-center justify-between border-b border-neutral-100">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={post.avatar}
                      alt={post.username}
                      className="w-8 h-8 rounded-full object-cover border border-black"
                    />
                    <div>
                      <p className="font-display font-extrabold text-xs text-black leading-none">
                        {post.userHandle}
                      </p>
                      {post.college && (
                        <p className="text-[10px] text-neutral-500 font-medium">{post.college}</p>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                    {post.tag}
                  </span>
                </div>

                {/* Post Image */}
                <div className="relative aspect-square overflow-hidden bg-black/5">
                  <img
                    src={post.image}
                    alt={post.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {/* Subtle hover icon */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <span className="font-display font-bold text-xs bg-black/70 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/30">
                      Inspect Post 🔍
                    </span>
                  </div>
                </div>

                {/* Post Actions & Caption */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => toggleLike(post.id, e)}
                        id={`like-post-${post.id}`}
                        className="flex items-center gap-1 text-xs font-bold transition-transform active:scale-125 cursor-pointer"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            isLiked
                              ? 'text-[#FF3E3E] fill-[#FF3E3E]'
                              : 'text-neutral-700 hover:text-[#FF3E3E]'
                          }`}
                        />
                        <span className="text-black font-display font-bold">
                          {post.likes.toLocaleString()}
                        </span>
                      </button>

                      <span className="text-neutral-400">
                        <MessageCircle className="w-5 h-5" />
                      </span>
                    </div>

                    <span className="text-neutral-400">
                      <Share2 className="w-4 h-4" />
                    </span>
                  </div>

                  <p className="text-xs text-neutral-800 font-medium line-clamp-2 leading-relaxed">
                    <strong className="text-black font-extrabold mr-1">{post.userHandle}</strong>
                    {post.caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA: Follow the Slurp */}
        <div className="mt-14 text-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            id="follow-the-slurp-btn"
            className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#FF7A00] to-[#FF3E3E] text-white font-display font-black text-base sm:text-lg px-8 py-4 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:opacity-95 transition-all"
          >
            <Instagram className="w-5 h-5" />
            <span>FOLLOW THE SLURP @bowlandbroth</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Post Inspection Modal */}
      {activePost && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] max-w-lg w-full overflow-hidden animate-in zoom-in-95">
            <div className="p-4 border-b border-black flex items-center justify-between bg-[#FFF8ED]">
              <div className="flex items-center gap-2">
                <img
                  src={activePost.avatar}
                  alt={activePost.username}
                  className="w-9 h-9 rounded-full object-cover border border-black"
                />
                <div>
                  <h4 className="font-display font-bold text-sm text-black">
                    {activePost.userHandle}
                  </h4>
                  <p className="text-xs text-neutral-500">{activePost.college || 'Creator Club'}</p>
                </div>
              </div>
              <button
                onClick={() => setActivePost(null)}
                className="w-8 h-8 rounded-full border border-black flex items-center justify-center font-bold hover:bg-neutral-100"
              >
                ✕
              </button>
            </div>

            <div className="aspect-square bg-black">
              <img
                src={activePost.image}
                alt={activePost.caption}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#FF3E3E] fill-[#FF3E3E]" />
                <span className="font-display font-black text-sm text-black">
                  {activePost.likes.toLocaleString()} people loved this slurp
                </span>
              </div>
              <p className="text-sm text-neutral-800 leading-relaxed font-medium">
                {activePost.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
