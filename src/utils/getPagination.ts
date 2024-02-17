import { SITE } from "@config";
import getPageNumbers from "./getPageNumbers";

interface GetPaginationProps<T> {
  posts: T;
  page: string | number;
  isIndex?: boolean;
}

const getPagination = <T>({
  posts,
  page,
  isIndex = false,
}: GetPaginationProps<T[]>) => {
  const totalPagesArray = getPageNumbers(posts.length);
  const totalPages = totalPagesArray.length;

  const currentPage = isIndex
    ? 1
    : page && !isNaN(Number(page)) && totalPagesArray.includes(Number(page))
      ? Number(page)
      : 0;

  const lastEvent = isIndex ? SITE.postPerPage : currentPage * SITE.postPerPage;
  const startEvent = isIndex ? 0 : lastEvent - SITE.postPerPage;
  const paginatedPosts = posts.slice(startEvent, lastEvent);

  return {
    totalPages,
    currentPage,
    paginatedPosts,
  };
};

export default getPagination;
