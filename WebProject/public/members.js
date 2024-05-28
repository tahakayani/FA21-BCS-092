document.addEventListener('DOMContentLoaded', function() {
    const memberForm = document.getElementById('member-form');
    
    if (memberForm) {
        memberForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(memberForm);
            const newMember = {
                name: formData.get('name'),
                age: formData.get('age'),
                email: formData.get('email'),
                membershipStatus: formData.get('membershipStatus')
            };

            fetch('/member', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newMember)
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert('Error: ' + data.error);
                } else {
                    window.location.href = '/members';
                }
            })
            .catch(error => alert('Error: ' + error.message));
        });
    }
});
