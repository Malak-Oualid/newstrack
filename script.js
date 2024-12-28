const apiKey = "";
const newsContainer = document.getElementById("news-container");

// Fetch and display general news on page load
async function fetchNews() {
  newsContainer.innerHTML = "<p>Loading news...</p>";
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
    );
    const data = await response.json();
    displayNews(data.articles);
  } catch (error) {
    newsContainer.innerHTML =
      "<p>Failed to load news. Please try again later.</p>";
    console.error(error);
  }
}

// Display news articles
function displayNews(articles) {
  newsContainer.innerHTML = "";

  // Filter out articles with missing or irrelevant content
  const validArticles = articles.filter(
    (article) =>
      article.title &&
      article.description &&
      article.url &&
      !article.title.toLowerCase().includes("removed") &&
      !article.description.toLowerCase().includes("removed")
  );

  if (validArticles.length === 0) {
    newsContainer.innerHTML = "<p>No articles available at the moment.</p>";
    return;
  }

  // Create news cards for valid articles
  validArticles.forEach((article) => {
    const { title, description, url, urlToImage } = article;

    // Skip articles without necessary fields
    if (!title || !description || !url || !urlToImage) return;

    // Create news card
    const newsCard = document.createElement("div");
    newsCard.className = "news-card";

    // Add image
    const image = document.createElement("img");
    image.src = urlToImage;
    image.alt = title;
    newsCard.appendChild(image);

 // Add title
    const titleElement = document.createElement('h3');
    titleElement.textContent = title;
    newsCard.appendChild(titleElement);

    // Add description
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description;
    newsCard.appendChild(descriptionElement);

    // Add link
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.textContent = 'Read more';
    newsCard.appendChild(link);

    // Append the card to the container
    newsContainer.appendChild(newsCard);
  });
}

// Fetch news on page load
fetchNews();
