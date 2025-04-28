interface LayoutProps {
  children?: React.ReactNode;
}

const CustomLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-[calc(100%-4rem)] max-w-4xl mx-auto py-8">{children}</div>
  );
};

export default CustomLayout;
