interface LayoutProps {
  children?: React.ReactNode;
}

const CustomLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen h-full overflow-x-hidden">
      <div className="max-w-md mx-auto min-h-screen p-8 h-full">{children}</div>
    </div>
  );
};

export default CustomLayout;
