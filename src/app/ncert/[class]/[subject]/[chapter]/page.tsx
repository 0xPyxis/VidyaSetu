'use client';

import ChapterContent, {
  type ChapterContentData,
} from '@/components/ChapterContent';
import { ChapterPageSkeleton } from '@/components/Skeletons';
import { saveReadingProgress } from '@/components/ResumeCard';
import authFetch from '@/lib/auth/authFetch';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

interface ChapterProps extends ChapterContentData {
  id: string;
  subjectId: string;
}

export default function NcertChapterPage() {
  const params = useParams<{
    class: string;
    subject: string;
    chapter: string;
  }>();

  const [chapter, setChapter] = useState<ChapterProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getChapter = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const url = `/api/ncert/chapter?chapter=${params.chapter}`;

      const res = await authFetch({
        url,
        options: {
          method: 'GET',
        },
      });

      if (res.status !== 200 || !res.message) {
        setChapter(null);
        setError(
          typeof res.message === 'string'
            ? res.message
            : 'The chapter API did not return content for this request.'
        );
        return;
      }

      const chapterData = res.message as ChapterProps;
      setChapter(chapterData);

      // Save reading progress to localStorage
      saveReadingProgress({
        chapterName: chapterData.title,
        chapterUrl: `/ncert/${params.class}/${params.subject}/${params.chapter}`,
        subjectName: chapterData.subjectName,
        className: params.class,
      });
    } catch {
      setChapter(null);
      setError('Unable to load this chapter. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [params.chapter, params.class, params.subject]);

  useEffect(() => {
    getChapter();
  }, [getChapter]);

  if (isLoading) {
    return <ChapterPageSkeleton />;
  }

  return <ChapterContent chapter={chapter} error={error} />;
}