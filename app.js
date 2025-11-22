document.addEventListener('DOMContentLoaded', () => {

    const btn = document.getElementById('searchButton');
    const input = document.getElementById('searchInput');
    const results = document.getElementById('resultsContainer');

    if (!btn || !input || !results) return;

    btn.addEventListener('click', async (e) => {
        e.preventDefault();
        let query = input.value.trim();
        let url = 'superheroes.php';
        if (query !== '') url += '?query=' + encodeURIComponent(query);

        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(res.statusText);
            const text = await res.text();

            // try parse JSON -> array
            try {
                const parsed = JSON.parse(text);
                if (Array.isArray(parsed)) {
                    alert(parsed.join(', '));
                    results.innerHTML = '<ul>' + parsed.map(p => `<li>${p}</li>`).join('') + '</ul>';
                    results.style.color = 'red';
                    return;
                }
            } catch (_) {
                // not JSON
            }

            // fallback: raw HTML/text
            alert(text);
            results.innerHTML = text;
            results.style.color = 'red';
        } catch (err) {
            alert('Error fetching superheroes: ' + err.message);
        }
    });
});
