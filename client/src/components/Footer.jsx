
const Footer = () => {
  return (
    <footer className="bg-background text-foreground py-4 text-center border-t border-border">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Created by Sakti Sumant Das. All
        rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
