import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { bookReviews } from "../content/meta";

interface BookData {
  title: string;
  thumbnail?: string;
  authors?: string[];
}

export interface BookReviewWithData {
  isbn: string;
  rating: number;
  bookData?: BookData;
  loading: boolean;
  error?: string;
}

interface BookContextType {
  books: BookReviewWithData[];
  isLoading: boolean;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBooks must be used within a BookProvider");
  }
  return context;
};

export const BookProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<BookReviewWithData[]>(
    bookReviews.map((review) => ({ ...review, loading: true }))
  );
  const [isLoading, setIsLoading] = useState(true);

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

    const fetchAllBooks = async () => {
      // Fetch all books
      await Promise.all(
        bookReviews.map((review, index) => fetchBookData(review.isbn, index))
      );
      setIsLoading(false);
    };

    fetchAllBooks();
  }, []);

  return (
    <BookContext.Provider value={{ books, isLoading }}>
      {children}
    </BookContext.Provider>
  );
};
