const navbar = document.getElementById("Navbar");

const navContent = ` 
  <div class="w-full">
    <div id="navbarContent"  class="flex h-24 pl-4 pr-5 items-center justify-between border-b border-gray-700 bg-gray-800 shadow-xl">

      <div class="flex items-center space-x-6">
        <a href="index.html" class="flex items-center space-x-2">
          <img
            class="h-10 w-auto"
            src="Img/Logo.png"
            alt="Logo"
          />
          <span class="text-white text-2xl font-semibold">ProMark CRM</span>
        </a>
      </div>

      <div class="hidden md:flex flex-1 justify-center space-x-8">
        <form class="flex items-center space-x-8" id="searchForm">

          <div class="flex flex-col space-y-2">
            <input
              type="text"
              id="navName"
              name="navName"
              class="w-64 rounded-md border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 p-3 text-sm"
              placeholder="Project's Name"
            />
          </div>

          <div class="flex flex-col space-y-2">
            <select
              id="campaign"
              name="campaign"
              class="w-64 rounded-md border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 p-3 text-sm"
            >
              <option value="">Select Campaign</option>

            </select>
          </div>

          <div class="flex flex-col space-y-2">
            <select
              id="client"
              name="client"
              class="w-64 rounded-md border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 p-3 text-sm "
            >
              <option value="">Select Client</option>
            </select>
          </div>
          
          <div class="flex items-center mt-4">

            <button
              type="submit"
              class="ml-2 bg-indigo-600 hover:bg-indigo-600 text-white font-medium rounded-md p-3 text-sm transition transform hover:scale-105"
            >
              Search
            </button>

            <a
              href="createProject.html"
              class="ml-12 bg-green-600 hover:bg-green-600 text-white font-medium rounded-md p-3 text-sm transition  transform hover:scale-105"
            >
              Create Project
            </a>

            <a
              href="createClient.html"
              class="ml-4 bg-blue-600 hover:bg-blue-600 text-white font-medium rounded-md p-3 text-sm transition  transform hover:scale-105"
            >
              Create Client
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
`;

navbar.innerHTML = navContent;
