document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('searchButton');
    const results = document.getElementById('resultsContainer');

    if (!btn) return;

    btn.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('superheroes.php');
            if (!res.ok) throw new Error(res.statusText);
            const text = await res.text();

            // try JSON -> array
            try {
                const parsed = JSON.parse(text);
                if (Array.isArray(parsed)) {
                    alert(parsed.join(', '));
                    results.innerHTML = '<ul>' + parsed.map(p => `<li>${p}</li>`).join('') + '</ul>';
                    return;
                }
            } catch (_) {
                // not JSON
            }

            // fallback: raw HTML/text
            alert(text);
            results.innerHTML = text;
        } catch (err) {
            alert('Error fetching superheroes: ' + err.message);
        }
    });
});
