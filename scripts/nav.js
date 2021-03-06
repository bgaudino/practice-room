const mobileTabs = `
<ul class="nav nav-tabs">
    <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Calculators</a>
        <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="scale">Scale Calculator</a></li>
            <li><a class="dropdown-item" href="interval">Interval Calculator</a></li>
            <li><a class="dropdown-item" href="chord">Chord Calculator</a></li>
        </ul>
    </li>
    <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Games</a>
        <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="note-id">Note Identification</a></li>
            <li><a class="dropdown-item" href="guitar-shark">Guitar Shark</a></li>
        </ul>
    </li>
    <li class="nav-item"><a class="nav-link" href="contact">Contact</a></li>

</ul>`;

let mql = window.matchMedia('(max-width: 960px)');

function tabs() {
        let tabs = document.querySelector('#tabs');
        let mobile = document.querySelector('#mobileTabs');
    if (mql.matches) {
        tabs.className = 'hidden';
        mobile.innerHTML = mobileTabs;
        mobile.className = '';

        
    } else {
        tabs.className = '';
        mobile.className = 'hidden';
    }
}

mql.addEventListener('change', tabs);
document.addEventListener('DOMContentLoaded', tabs);



