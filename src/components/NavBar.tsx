const NavBar = () => {
	return (
		<header className="flex justify-between items-center p-4 bg-primary-900">
			<a
				href="/"
				className="flex flex-col items-center
            bg-gradient-to-r from-blue-200  to-blue-500 bg-clip-text text-transparent cursor-pointer"
			>
				<h1 className="text-2xl font-bold ">Maria Sidorova</h1>
				<p className="text-xs lowercase">Showcase my react skills</p>
			</a>
			<nav className="flex gap-6 items-center font-bold tracking-wider uppercase">
				<a href="/" className="text-gray-300 hover:text-white">
					All Projects
				</a>
				<a href="/motion" className="text-gray-300 hover:text-white">
					Motion
				</a>
				<a href="/threejs" className="text-gray-300 hover:text-white">
					Three<span className="">JS</span>
				</a>
			</nav>
		</header>
	);
};

export default NavBar;
