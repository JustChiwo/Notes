function Sidebar() {
  return (
    <aside className="border-b border-line bg-paper px-5 py-4 md:w-52 md:shrink-0 md:border-b-0 md:border-r md:px-6 md:py-8">
      <nav aria-label="Main navigation" className="flex gap-2 overflow-x-auto md:flex-col md:gap-3">
        <span aria-current="page" className="whitespace-nowrap rounded-lg bg-content px-4 py-2.5 text-sm font-semibold text-brand">
          My Notes
        </span>
      </nav>
    </aside>
  );
}

export default Sidebar;
