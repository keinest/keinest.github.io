// Gestion du menu mobile et chargement des projets GitHub

document.addEventListener('DOMContentLoaded', function() 
{
  	const toggle = document.querySelector('.menu-toggle');
  	const nav = document.querySelector('.nav');

  	if(toggle && nav) 
	{
    	toggle.addEventListener('click',() => {
    	  const open = nav.classList.toggle('open');
    	  toggle.setAttribute('aria-expanded', open);
    	});

    	document.querySelectorAll('.nav a').forEach(a => {
    	  a.addEventListener('click',() => nav.classList.remove('open'));
    	});
  	}

  	// Chargement des repos GitHub
  	loadRepos();
});

async function loadRepos() 
{
	const username = 'keinest';
	const container = document.getElementById('projects-list');
	if(!container) return;

	const staticCards = container.innerHTML;
	container.innerHTML = staticCards + '<p style="grid-column: 1 / -1; text-align: center;">Chargement des projets GitHub…</p>';

	try 
	{
	  	const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
	  	if(!res.ok) throw new Error('GitHub API error ' + res.status);
	  	const repos = await res.json();

	  	const filtered = repos.filter(r => !r.fork &&(r.description || r.language));
	  	const reposToShow = filtered.slice(0, 10);

	  	if(reposToShow.length === 0) return;

	  	container.innerHTML = staticCards;

	  	reposToShow.forEach(r => 
		{
	  	  	const el = document.createElement('article');
	  	  	el.className = 'project-card';
			
	  	  	const img = document.createElement('img');
	  	  	img.src = 'b1cc20b7f0115bc41472288edac2abe9.jpg';
	  	  	img.alt = r.name;
			
	  	  	const body = document.createElement('div');
	  	  	body.className = 'card-body';
			
	  	  	const h3 = document.createElement('h3');
	  	  	h3.textContent = r.name;
			
	  	  	const p = document.createElement('p');
	  	  	p.textContent = r.description ||(r.language ? 'Langage: ' + r.language : 'Projet GitHub');
			
	  	  	const links = document.createElement('p');
	  	  	const repoLink = document.createElement('a');
	  	  	repoLink.href = r.html_url;
	  	  	repoLink.textContent = 'Code';
	  	  	repoLink.className = 'card-link';
	  	  	repoLink.target = '_blank';
	  	  	repoLink.rel = 'noopener noreferrer';
			
	  	  	links.appendChild(repoLink);
			
	  	  	if(r.language) {
	  	  	  const langTag = document.createElement('span');
	  	  	  langTag.innerHTML = ' · <span style="color: var(--accent); font-weight: 600;">' + r.language + '</span>';
	  	  	  links.appendChild(langTag);
	  	  	}
		  
	  	  	body.appendChild(h3);
	  	  	body.appendChild(p);
	  	  	body.appendChild(links);
		  
	  	  	el.appendChild(img);
	  	  	el.appendChild(body);
		  
	  	  	container.appendChild(el);
	  	});
	} 
	catch(err) 
	{
	  console.error(err);
	  container.innerHTML = staticCards + '<p style="grid-column: 1 / -1; text-align: center; color: #ff4757;">Erreur lors du chargement des projets GitHub.</p>';
	}
}
