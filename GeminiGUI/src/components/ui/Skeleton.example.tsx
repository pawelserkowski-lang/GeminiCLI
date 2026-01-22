/**
 * GeminiGUI - Skeleton Components Examples
 * @module components/ui/Skeleton.example
 *
 * Visual examples and usage patterns for skeleton loading components.
 * This file is for documentation and development reference only.
 */

import { useState } from 'react';
import {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonMessage,
} from './Skeleton';
import { MessageSkeleton, MessageStreamSkeleton } from '../chat/MessageSkeleton';

// ============================================================================
// SKELETON SHOWCASE COMPONENT
// ============================================================================

export const SkeletonShowcase = () => {
  const [variant, setVariant] = useState<'pulse' | 'shimmer'>('pulse');

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-[var(--matrix-accent)]">
          Skeleton Loading Components
        </h1>
        <p className="text-[var(--matrix-text-dim)]">
          Matrix-themed animated placeholders with pulse and shimmer effects
        </p>
      </div>

      {/* Controls */}
      <div className="flex gap-4 p-4 bg-black/30 rounded-lg border border-[var(--matrix-border)]">
        <label className="flex items-center gap-2 text-[var(--matrix-text)]">
          <input
            type="radio"
            value="pulse"
            checked={variant === 'pulse'}
            onChange={(e) => setVariant(e.target.value as 'pulse' | 'shimmer')}
          />
          Pulse
        </label>
        <label className="flex items-center gap-2 text-[var(--matrix-text)]">
          <input
            type="radio"
            value="shimmer"
            checked={variant === 'shimmer'}
            onChange={(e) => setVariant(e.target.value as 'pulse' | 'shimmer')}
          />
          Shimmer
        </label>
      </div>

      {/* SkeletonText Example */}
      <div className="space-y-4 p-4 bg-black/20 rounded-lg border border-[var(--matrix-border)]">
        <h2 className="text-lg font-semibold text-[var(--matrix-accent)]">
          SkeletonText
        </h2>
        <p className="text-sm text-[var(--matrix-text-dim)]">
          Animated text placeholders with configurable line count
        </p>

        <div className="space-y-6">
          {/* Single line */}
          <div>
            <p className="text-xs text-[var(--matrix-text-dim)] mb-2">
              Single Line
            </p>
            <SkeletonText variant={variant} />
          </div>

          {/* Three lines */}
          <div>
            <p className="text-xs text-[var(--matrix-text-dim)] mb-2">
              Three Lines (paragraph)
            </p>
            <SkeletonText lines={3} variant={variant} />
          </div>

          {/* Heading */}
          <div>
            <p className="text-xs text-[var(--matrix-text-dim)] mb-2">
              Heading (tall)
            </p>
            <SkeletonText
              height="1.5em"
              width="60%"
              lines={1}
              variant={variant}
            />
          </div>
        </div>
      </div>

      {/* SkeletonAvatar Example */}
      <div className="space-y-4 p-4 bg-black/20 rounded-lg border border-[var(--matrix-border)]">
        <h2 className="text-lg font-semibold text-[var(--matrix-accent)]">
          SkeletonAvatar
        </h2>
        <p className="text-sm text-[var(--matrix-text-dim)]">
          Circular loading placeholders with various sizes
        </p>

        <div className="flex gap-6">
          <div className="flex flex-col items-center gap-2">
            <SkeletonAvatar size={32} variant={variant} />
            <span className="text-xs text-[var(--matrix-text-dim)]">
              32px
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <SkeletonAvatar size={48} variant={variant} />
            <span className="text-xs text-[var(--matrix-text-dim)]">
              48px
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <SkeletonAvatar size={64} variant={variant} />
            <span className="text-xs text-[var(--matrix-text-dim)]">
              64px
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <SkeletonAvatar size={80} variant={variant} />
            <span className="text-xs text-[var(--matrix-text-dim)]">
              80px
            </span>
          </div>
        </div>
      </div>

      {/* SkeletonCard Example */}
      <div className="space-y-4 p-4 bg-black/20 rounded-lg border border-[var(--matrix-border)]">
        <h2 className="text-lg font-semibold text-[var(--matrix-accent)]">
          SkeletonCard
        </h2>
        <p className="text-sm text-[var(--matrix-text-dim)]">
          Complete card skeleton with header and content
        </p>

        <div className="grid grid-cols-2 gap-4">
          <SkeletonCard lines={2} variant={variant} height="180px" />
          <SkeletonCard lines={3} variant={variant} height="220px" />
        </div>
      </div>

      {/* SkeletonMessage Example */}
      <div className="space-y-4 p-4 bg-black/20 rounded-lg border border-[var(--matrix-border)]">
        <h2 className="text-lg font-semibold text-[var(--matrix-accent)]">
          SkeletonMessage
        </h2>
        <p className="text-sm text-[var(--matrix-text-dim)]">
          Chat message placeholders with alternating alignment
        </p>

        <SkeletonMessage isUser={false} variant={variant} />
        <SkeletonMessage isUser={true} variant={variant} />
        <SkeletonMessage isUser={false} variant={variant} />
      </div>

      {/* MessageSkeleton Example */}
      <div className="space-y-4 p-4 bg-black/20 rounded-lg border border-[var(--matrix-border)]">
        <h2 className="text-lg font-semibold text-[var(--matrix-accent)]">
          MessageSkeleton
        </h2>
        <p className="text-sm text-[var(--matrix-text-dim)]">
          Multiple aligned message skeletons with varied widths
        </p>

        <MessageSkeleton isUser={false} count={2} variant={variant} />
        <MessageSkeleton isUser={true} count={1} variant={variant} />
      </div>

      {/* MessageStreamSkeleton Example */}
      <div className="space-y-4 p-4 bg-black/20 rounded-lg border border-[var(--matrix-border)]">
        <h2 className="text-lg font-semibold text-[var(--matrix-accent)]">
          MessageStreamSkeleton
        </h2>
        <p className="text-sm text-[var(--matrix-text-dim)]">
          Complete conversation thread with alternating user/assistant messages
        </p>

        <MessageStreamSkeleton variant={variant} />
      </div>

      {/* Generic Skeleton Example */}
      <div className="space-y-4 p-4 bg-black/20 rounded-lg border border-[var(--matrix-border)]">
        <h2 className="text-lg font-semibold text-[var(--matrix-accent)]">
          Generic Skeleton
        </h2>
        <p className="text-sm text-[var(--matrix-text-dim)]">
          Flexible base skeleton for custom shapes
        </p>

        <div className="space-y-3">
          {/* Rectangle */}
          <div>
            <p className="text-xs text-[var(--matrix-text-dim)] mb-2">
              Rectangle
            </p>
            <Skeleton
              width="100%"
              height="40px"
              variant={variant}
              className="rounded"
            />
          </div>

          {/* Square */}
          <div>
            <p className="text-xs text-[var(--matrix-text-dim)] mb-2">
              Square
            </p>
            <Skeleton
              width="200px"
              height="200px"
              variant={variant}
              className="rounded"
            />
          </div>

          {/* Button-like */}
          <div>
            <p className="text-xs text-[var(--matrix-text-dim)] mb-2">
              Button Shape
            </p>
            <Skeleton
              width="120px"
              height="36px"
              variant={variant}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonShowcase;
