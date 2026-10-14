// Footer.jsx - shared footer shown on every page.
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light text-center py-3 mt-5">
      <div className="container">
        <small>© {year} Spice Route · College assignment project (React + Vite)</small>
      </div>
    </footer>
  );
}

export default Footer;
