// Main script to build and interact with family tree

// Render the family tree
function renderFamilyTree() {
    const container = document.getElementById('family-tree');
    container.innerHTML = '';
    
    // Create grandparents section (top)
    const grandparentSection = document.createElement('div');
    grandparentSection.className = 'generation';
    grandparentSection.id = 'generation-grandparents';
    
    const grandfather = familyData.grandfather;
    const grandmother = familyData.grandmother;
    
    // Create person card for grandfather and grandmother
    const grandfatherCard = createPersonCard(grandfather);
    const grandmotherCard = createPersonCard(grandmother);
    
    grandparentSection.appendChild(grandfatherCard);
    grandparentSection.appendChild(grandmotherCard);
    
    container.appendChild(grandparentSection);
    
    // Get all children IDs from both grandparents
    const allChildren = new Set([
        ...(grandfather.children || []),
        ...(grandmother.children || [])
    ]);
    
    // Create children sections grouped by generation
    renderGenerations(Array.from(allChildren), container, 1);
}

// Get family member by ID
function getFamilyMember(id) {
    return familyData[id];
}

// Render multiple generations
function renderGenerations(childrenIds, container, generationLevel) {
    if (childrenIds.length === 0) return;
    
    // Only show first 3 generations (grandparents, aunts/uncles, grandchildren)
    if (generationLevel > 2) return;
    
    // Add generation label
    const generationContainer = document.createElement('div');
    const label = document.createElement('div');
    label.className = 'generation-label';
    const labels = ['', 'Children', 'Grandchildren'];
    label.textContent = labels[generationLevel] || '';
    if (generationLevel > 0) {
        generationContainer.appendChild(label);
    }
    
    const generation = document.createElement('div');
    generation.className = 'generation';
    generation.id = `generation-${generationLevel}`;
    
    childrenIds.forEach(childId => {
        const child = getFamilyMember(childId);
        if (child) {
            const card = createPersonCard(child);
            generation.appendChild(card);
        }
    });
    
    generationContainer.appendChild(generation);
    container.appendChild(generationContainer);
    
    // Recursively render next generation
    const nextGenChildren = [];
    childrenIds.forEach(childId => {
        const child = getFamilyMember(childId);
        if (child && child.children && child.children.length > 0) {
            nextGenChildren.push(...child.children);
        }
    });
    
    if (nextGenChildren.length > 0) {
        renderGenerations(nextGenChildren, container, generationLevel + 1);
    }
}

// Create a person card element
function createPersonCard(person) {
    const card = document.createElement('div');
    card.className = 'person-card';
    card.setAttribute('data-person-id', person.id);
    
    const img = document.createElement('img');
    img.src = person.image;
    img.alt = person.name;
    img.className = 'person-photo';
    img.onerror = function() {
        this.src = 'https://via.placeholder.com/120x120?text=' + person.name.charAt(0);
    };
    
    const name = document.createElement('div');
    name.className = 'person-name';
    name.textContent = person.name;
    
    card.appendChild(img);
    card.appendChild(name);
    
    // Add click event to show extended family
    card.addEventListener('click', () => {
        showPersonDetails(person);
    });
    
    return card;
}

// Show person details in modal
function showPersonDetails(person) {
    const modal = document.getElementById('person-modal');
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <div class="modal-header">
            <img src="${person.image}" alt="${person.name}" class="modal-photo" 
                 onerror="this.src='https://via.placeholder.com/100x100?text=' + this.alt.charAt(0)">
            <div class="modal-info">
                <h2>${person.name}</h2>
                <p><strong>Born:</strong> ${person.yearBorn}</p>
                ${person.yearPassed ? `<p><strong>Passed:</strong> ${person.yearPassed}</p>` : ''}
                ${person.location ? `<p><strong>Location:</strong> ${person.location}</p>` : ''}
            </div>
        </div>
        
        ${person.children && person.children.length > 0 ? `
            <div class="modal-children">
                <h3>Children</h3>
                <div class="children-grid">
                    ${person.children.map(childId => {
                        const child = getFamilyMember(childId);
                        if (!child) return '';
                        return `
                            <div class="person-card modal-child-card" style="margin-bottom: 20px; cursor: pointer;" data-child-id="${childId}">
                                <img src="${child.image}" alt="${child.name}" class="person-photo" 
                                     style="width: 80px; height: 80px;"
                                     onerror="this.src='https://via.placeholder.com/80x80?text=' + this.alt.charAt(0)">
                                <div class="person-name" style="font-size: 0.9rem;">${child.name}</div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        ` : '<div class="no-children">No children listed</div>'}
    `;
    
    modal.style.display = 'block';
    
    // Add click handlers to modal children
    document.querySelectorAll('.modal-child-card').forEach(card => {
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            const childId = e.currentTarget.getAttribute('data-child-id');
            const child = getFamilyMember(childId);
            if (child) {
                showPersonDetails(child);
            }
        });
    });
}

// Close modal when clicking X
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('person-modal').style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    const modal = document.getElementById('person-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            // Show all when search is cleared
            document.querySelectorAll('.person-card').forEach(card => {
                card.style.display = 'flex';
            });
            return;
        }
        
        // Search through all person cards
        document.querySelectorAll('.person-card').forEach(card => {
            const name = card.querySelector('.person-name').textContent.toLowerCase();
            if (name.includes(searchTerm)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Initialize the family tree when page loads
document.addEventListener('DOMContentLoaded', () => {
    renderFamilyTree();
    setupSearch();
});

