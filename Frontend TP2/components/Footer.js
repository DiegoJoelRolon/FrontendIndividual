function createFooter() {
  const footer = document.createElement('footer');
  footer.classList.add('bg-gray-800', 'text-white', 'py-4', 'mt-auto');
  
  const container = document.createElement('div');
  container.classList.add('mx-auto', 'max-w-7xl', 'px-4', 'sm:px-6', 'lg:px-8');
  
  const contentDiv = document.createElement('div');
  contentDiv.classList.add('flex', 'flex-col', 'items-center');
  
  const copyrightText = document.createElement('p');
  copyrightText.classList.add('text-sm', 'text-gray-400');
  copyrightText.textContent = '© 2024 Your Company. All rights reserved.';
  
  const linkDiv = document.createElement('div');
  linkDiv.classList.add('flex', 'mt-2', 'space-x-4');
  
  const privacyLink = document.createElement('a');
  privacyLink.href = 'createClient.html';
  privacyLink.classList.add('text-gray-400', 'hover:text-white');
  privacyLink.textContent = 'Create new Client';
  
  const termsLink = document.createElement('a');
  termsLink.href = 'index.html';
  termsLink.classList.add('text-gray-400', 'hover:text-white');
  termsLink.textContent = 'Index';
  
  const contactLink = document.createElement('a');
  contactLink.href = 'createProject.html';
  contactLink.classList.add('text-gray-400', 'hover:text-white');
  contactLink.textContent = 'Create new Project';
  
  linkDiv.appendChild(privacyLink);
  linkDiv.appendChild(termsLink);
  linkDiv.appendChild(contactLink);
  
  contentDiv.appendChild(copyrightText);
  contentDiv.appendChild(linkDiv);
  
  container.appendChild(contentDiv);
  
  footer.appendChild(container);
  
  document.body.appendChild(footer);
}

document.addEventListener('DOMContentLoaded', createFooter);
