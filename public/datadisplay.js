async function loadBlogs() {
    let blogs = [];

    try {

        const response = await fetch('/api/bloglist');
        let objblogs = await response.json();
        blogs = [objblogs];
        localStorage.setItem('blogs', JSON.stringify(blogs));
        console.log(blogs);
    
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

        for (i = 0; i < blogs.length; i++) {
            const liEl = document.createElement('li');
            const blogItem = blogs[i].email;
            liEl.textContent = blogItem;
             
            ulEl.appendChild(liEl);
        }
        listBodyEl.appendChild(ulEl);
    }
}

loadBlogs();