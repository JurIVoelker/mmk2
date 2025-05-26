interface LayoutProps {
  children?: React.ReactNode;
}

const CustomLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="max-w-md mx-auto py-8 min-h-screen h-full">
      {children}
    </div>
  );
};

export default CustomLayout;
