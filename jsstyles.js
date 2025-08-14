document.addEventListener("DOMContentLoaded", function(){
    const yearLinks = document.querySelectorAll('nav.timeline a');
    const allYearSections = document.querySelectorAll('#card > section');

    yearLinks.forEach(link => {
        link.addEventListener("click", function(event){
            event.preventDefault();
            const selectedYear = this.getAttribute("data-year");

            allYearSections.forEach(section =>{
                if(section.id.includes(selectedYear)){
                    section.style.display = "block";
                }else{
                    section.style.display = "none";
                }
            });
            yearLinks.forEach(l => l.classList.remove("active"));
            this.classList.add("active");
        })});
        
        allYearSections.forEach(section => section.style.display = "block" );
    });

document.addEventListener("DOMContentLoaded", () => {
    fetch("events.json")
        .then(response => response.json())
        .then(data =>{
            for (const decId in data){
                const decSection = document.getElementById(decId);
                if (!decSection) continue;
                data[decId].forEach(Event =>{
                    const eventSection = document.createElement("section");
                    eventSection.id = Event.id;
                    eventSection.classList.add("Event-card");

                    eventSection.innerHTML = `
                    <h4>${Event.year}</h4>
                    <h4>${Event.title}</h4>
                    <article>${Event.description}</article>`;
                    decSection.appendChild(eventSection);
                });
            }
        })
        .catch(error => console.error("Error loading events.json:", error));
});
