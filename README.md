## Задание


- отримання всіх книг з можливою пагінацією (параметри page та limit)
    GET https://testing-books.onrender.com/books/<pagination>
    GET https://testing-books.onrender.com/books/<pagination>/<limit>

- отримання однієї книги з id;
    GET https://testing-books.onrender.com/book/<id book>

- додавання книги із валідацією тіла запиту;
   POST https://testing-books.onrender.com/book 
   Request body:
   {
    "title": "Joshua Chavez",
    "author": "Mabel Nelson"
   }
     
- оновлення книги з id (роут повинен повертати оновлену книгу);
   PUT https://testing-books.onrender.com/book 
   Request body:
   {
   "id": <id book>,
    "title": "Irene Gutierrez",
    "author": "Lawrence Davidson"
   }

- видалення книги з id;
   DELETE https://testing-books.onrender.com/book/<id book>
  


