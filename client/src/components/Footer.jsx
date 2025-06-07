const Footer = () => {
  return (
    <footer className="bg-background text-foreground py-4 text-center border-t border-border">
      <p className="text-sm">
        <span className="block md:inline-block">
        
          &copy; {new Date().getFullYear()} Created by Sakti Sumant Das.  {" "}
        </span>
        <span className="md:ml-2">All rights reserved.</span>
      </p>
    </footer>
  );
};

export default Footer;
