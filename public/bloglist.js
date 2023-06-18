async function loadBlogs() {
    let blogs = [];

    try {

        const response = await fetch('/bloglist');
        blogs = await response.json();
        localStorage.setItem('blogs', JSON.stringify(blogs));
    
    } catch {
        const blogsText = localStorage.getItem('blogs');
        if (blogsText) {
            blogs = JSON.parse(blogsText);
        }
    }
    displayBlogs(blogs);
}

function displayBlogs(blogs) {
    const listBodyEl = document.querySelector('#blogs');

    if (blogs.length) {
        const ulEl = document.createElement('ul');

        for (const [i, blog] of blogs.entries()) {
            const liEl = document.createElement('li');
            const blogItem = document.createTextNode('S{blog[0]} - $blog[1]}');
            liEl.textContent = i + 1;
            
            liEl.appendChild(blogItem); 
            ulEl.appendChild(liEL);
        }
        listBodyEl.appendChild(ulEL);
    }
}

loadBlogs();

