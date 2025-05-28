interface LayoutProps {
  children?: React.ReactNode;
}

const CustomLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="max-w-md mx-auto p-8 min-h-screen h-full overflow-hidden">
      {children}
    </div>
  );
};

export default CustomLayout;
