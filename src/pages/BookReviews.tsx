import { useEffect, useState, useMemo } from "react";
import { bookReviews } from "../content/meta";
import FadeInSection from "../components/FadeInSection";
import {
  IconSearch,
  IconSortAscending,
  IconSortDescending,
  IconStar,
} from "@tabler/icons-react";

interface BookData {
  title: string;
  thumbnail?: string;
  authors?: string[];
}

interface BookReviewWithData {
  isbn: string;
  rating: number;
  bookData?: BookData;
  loading: boolean;
  error?: string;
}

const BookReviews = () => {
  const [books, setBooks] = useState<BookReviewWithData[]>(
    bookReviews.map((review) => ({ ...review, loading: true }))
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    const fetchBookData = async (isbn: string, index: number) => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
        );
        const data = await response.json();

        if (data.items && data.items.length > 0) {
          const bookInfo = data.items[0].volumeInfo;
          setBooks((prev) => {
            const updated = [...prev];
            updated[index] = {
              ...updated[index],
              bookData: {
                title: bookInfo.title || "Unknown Title",
                thumbnail: bookInfo.imageLinks?.thumbnail?.replace(
                  "http://",
                  "https://"
                ),
                authors: bookInfo.authors,
              },
              loading: false,
            };
            return updated;
          });
        } else {
          setBooks((prev) => {
            const updated = [...prev];
            updated[index] = {
              ...updated[index],
              loading: false,
              error: "Book not found",
            };
            return updated;
          });
        }
      } catch (error) {
        console.error("Error fetching book data:", error);
        setBooks((prev) => {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            loading: false,
            error: "Failed to load book data",
          };
          return updated;
        });
      }
    };

    bookReviews.forEach((review, index) => {
      fetchBookData(review.isbn, index);
    });
  }, []);

  const filteredAndSortedBooks = useMemo(() => {
    let filtered = books;

    if (searchQuery.trim()) {
      filtered = books.filter((book) => {
        const title = book.bookData?.title?.toLowerCase() || "";
        const authors = book.bookData?.authors?.join(" ").toLowerCase() || "";
        const query = searchQuery.toLowerCase();
        return title.includes(query) || authors.includes(query);
      });
    }

    return [...filtered].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.rating - b.rating;
      } else {
        return b.rating - a.rating;
      }
    });
  }, [books, searchQuery, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  // Get color based on rating (1-10 scale)
  const getRatingColor = (rating: number): string => {
    // Normalize rating to 0-1 scale
    const normalized = Math.max(0, Math.min(10, rating)) / 10;

    // Red (low) to Yellow (mid) to Green (high)
    if (normalized < 0.5) {
      // Red to Yellow (0-5 rating)
      const r = 255;
      const g = Math.round(255 * (normalized * 2));
      return `rgb(${r}, ${g}, 0)`;
    } else {
      // Yellow to Green (5-10 rating)
      const r = Math.round(255 * (1 - (normalized - 0.5) * 2));
      const g = 255;
      return `rgb(${r}, ${g}, 0)`;
    }
  };

  return (
    <section id="book-reviews">
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <IconSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2  border border-gray-700 rounded-lg focus:outline-none focus:border-blue-400 transition-colors"
          />
        </div>

        <button
          onClick={toggleSortOrder}
          className="flex items-center gap-2 px-4 py-2 border border-gray-700 rounded-lg hover:border-blue-400 transition-colors"
          aria-label={`Sort ${
            sortOrder === "asc" ? "ascending" : "descending"
          }`}
        >
          {sortOrder === "asc" ? (
            <IconSortAscending size={20} />
          ) : (
            <IconSortDescending size={20} />
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedBooks.map((book, index) => (
          <FadeInSection
            key={index}
            direction="up"
            delay={Math.min(index, 5) * 100}
            duration={500}
          >
            <div className="flex flex-col items-center text-center">
              {book.loading ? (
                <div className="w-32 h-48 bg-gray-700 animate-pulse rounded mb-4" />
              ) : book.error ? (
                <div className="w-32 h-48 bg-gray-700 rounded mb-4 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              ) : book.bookData?.thumbnail ? (
                <img
                  src={book.bookData.thumbnail}
                  alt={book.bookData.title || "Book cover"}
                  className="w-32 h-48 object-cover rounded mb-4 shadow-lg"
                />
              ) : (
                <div className="w-32 h-48 bg-gray-700 rounded mb-4 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              <h3 className="text-xl font-semibold mb-2">
                {book.bookData?.title || "Loading..."}
              </h3>

              {book.bookData?.authors && (
                <p className="text-gray-400 text-sm mb-2">
                  {book.bookData.authors.join(", ")}
                </p>
              )}

              <div className="flex items-center gap-2">
                {book.rating > 9 && (
                  <IconStar
                    size={24}
                    className="text-yellow-400 fill-yellow-400"
                  />
                )}
                <span
                  className="text-2xl font-bold"
                  style={{ color: getRatingColor(book.rating) }}
                >
                  {book.rating.toFixed(1)}
                </span>
                <span className="text-gray-400">/ 10</span>
              </div>
            </div>
          </FadeInSection>
        ))}
      </div>
    </section>
  );
};

export default BookReviews;
