document.addEventListener('DOMContentLoaded', function() {
    const membersTableBody = document.getElementById('members-table-body');
    const searchForm = document.getElementById('search-form');
    const searchQueryInput = document.getElementById('search-query');
    const searchHistoryList = document.getElementById('history-list');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const pageNumberSpan = document.getElementById('page-number');

    let currentPage = 1;
    let currentSearchQuery = '';

    function fetchMembers(page, query) {
        const url = new URL('/member', window.location.origin);
        url.searchParams.append('page', page);
        if (query) {
            url.searchParams.append('search', query);
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                membersTableBody.innerHTML = '';
                data.members.forEach(member => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${member.name}</td>
                        <td>${member.age}</td>
                        <td>${member.email}</td>
                        <td>${member.membershipStatus}</td>
                        <td>
                            <a href="/member-form.html?id=${member._id}">Edit</a>
                            <button data-id="${member._id}" class="delete-btn">Delete</button>
                        </td>
                    `;
                    membersTableBody.appendChild(row);
                });

                pageNumberSpan.textContent = `Page ${data.page} of ${data.totalPages}`;
                prevPageButton.disabled = data.page <= 1;
                nextPageButton.disabled = data.page >= data.totalPages;

                document.querySelectorAll('.delete-btn').forEach(button => {
                    button.addEventListener('click', function() {
                        const memberId = this.getAttribute('data-id');
                        fetch(`/member/${memberId}`, { method: 'DELETE' })
                            .then(() => fetchMembers(currentPage, currentSearchQuery));
                    });
                });
            });
    }

    function loadSearchHistory() {
        fetch('/search-history')
            .then(response => response.json())
            .then(history => {
                searchHistoryList.innerHTML = '';
                history.forEach(term => {
                    const li = document.createElement('li');
                    li.textContent = term;
                    li.addEventListener('click', function() {
                        searchQueryInput.value = term;
                        currentSearchQuery = term;
                        currentPage = 1;
                        fetchMembers(currentPage, currentSearchQuery);
                    });
                    searchHistoryList.appendChild(li);
                });
            });
    }

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        currentSearchQuery = searchQueryInput.value;
        currentPage = 1;
        fetchMembers(currentPage, currentSearchQuery);
        fetch('/search-history', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ term: currentSearchQuery })
        }).then(loadSearchHistory);
    });

    prevPageButton.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            fetchMembers(currentPage, currentSearchQuery);
        }
    });

    nextPageButton.addEventListener('click', function() {
        currentPage++;
        fetchMembers(currentPage, currentSearchQuery);
    });

    fetchMembers(currentPage, currentSearchQuery);
    loadSearchHistory();
});
