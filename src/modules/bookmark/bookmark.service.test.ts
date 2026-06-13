import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  chapterFindUnique: vi.fn(),
  bookmarkCreate: vi.fn(),
  bookmarkFindFirst: vi.fn(),
}));

vi.mock('@/lib/prisma', () => ({
  prisma: {
    chapter: {
      findUnique: mocks.chapterFindUnique,
    },
    bookmark: {
      create: mocks.bookmarkCreate,
      findFirst: mocks.bookmarkFindFirst,
    },
  },
}));

import { BookmarkService } from './bookmark.service';

describe('BookmarkService.createBookmark', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('returns existing bookmark when duplicate bookmark is created', async () => {
    const existingBookmark = {
        id: 'bookmark-1',
        userId: 'user-1',
        chapterId: 'chapter-1',
        chapter: {
            id: 'chapter-1',
        },
    };

    mocks.chapterFindUnique.mockResolvedValue({
        id: 'chapter-1',
    });

     mocks.bookmarkCreate.mockRejectedValue({
        code: 'P2002',
    });

    mocks.bookmarkFindFirst.mockResolvedValue(existingBookmark);

    const result = await BookmarkService.createBookmark(
        'user-1',
        'chapter-1'
    );

     expect(result).toEqual(existingBookmark);
    });
});