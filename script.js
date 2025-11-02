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
            // Remove dynamically added generation 3
            const gen3 = document.getElementById('generation-3');
            if (gen3) {
                gen3.parentElement.remove();
            }
            return;
        }
        
        // Find all matching person IDs
        const matchingIds = new Set();
        const foundPersons = [];
        
        Object.keys(familyData).forEach(id => {
            const person = familyData[id];
            if (person.name.toLowerCase().includes(searchTerm)) {
                foundPersons.push({ id, person });
                matchingIds.add(id);
                
                // Add all ancestors (parents, grandparents, etc)
                const ancestors = findAncestors(id);
                ancestors.forEach(ancestor => matchingIds.add(ancestor));
                
                // Add DIRECT children only, not all descendants
                if (person.children) {
                    person.children.forEach(childId => matchingIds.add(childId));
                }
            }
        });
        
        // Check if any found person is in generation 2 and has children
        let needToRenderGeneration3 = false;
        foundPersons.forEach(({ id }) => {
            const person = familyData[id];
            if (person && person.children && person.children.length > 0) {
                // Check if this person is in generation 2
                const ancestors = findAncestors(id);
                if (ancestors.length >= 2) { // At least 2 ancestors = generation 2+
                    needToRenderGeneration3 = true;
                }
            }
        });
        
        // Remove any existing generation 3 from previous search
        const existingGen3 = document.getElementById('generation-3');
        if (existingGen3) {
            existingGen3.parentElement.remove();
        }
        
        // Show/hide cards based on matching IDs
        document.querySelectorAll('.person-card').forEach(card => {
            const personId = card.getAttribute('data-person-id');
            if (matchingIds.has(personId)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
        
        // If we need generation 3, dynamically add it
        if (needToRenderGeneration3) {
            // Only add gen 3 if we found a person in generation 2 directly
            const gen3Children = [];
            
            // Check if any of the found persons are in generation 2
            foundPersons.forEach(({ id }) => {
                const person = familyData[id];
                if (person && person.children && person.children.length > 0) {
                    const ancestors = findAncestors(id);
                    // If person has exactly 2 ancestors, they're in generation 2
                    if (ancestors.length === 2) {
                        gen3Children.push(...person.children);
                    }
                }
            });
            
            if (gen3Children.length > 0) {
                renderGeneration3(gen3Children);
            }
        }
    });
}

// Dynamically render generation 3 (great-grandchildren)
function renderGeneration3(childrenIds) {
    const familyTreeContainer = document.querySelector('.family-tree');
    
    const generationContainer = document.createElement('div');
    const label = document.createElement('div');
    label.className = 'generation-label';
    label.textContent = 'Great-Grandchildren';
    generationContainer.appendChild(label);
    
    const generation = document.createElement('div');
    generation.className = 'generation';
    generation.id = 'generation-3';
    
    childrenIds.forEach(childId => {
        const child = getFamilyMember(childId);
        if (child) {
            const card = createPersonCard(child);
            generation.appendChild(card);
        }
    });
    
    generationContainer.appendChild(generation);
    familyTreeContainer.appendChild(generationContainer);
}

// Find ancestors of a person
function findAncestors(personId) {
    const ancestors = [];
    const person = familyData[personId];
    if (!person) return ancestors;
    
    // Find parents
    Object.keys(familyData).forEach(id => {
        const potentialParent = familyData[id];
        if (potentialParent && potentialParent.children && potentialParent.children.includes(personId)) {
            ancestors.push(id);
            // Recursively find their ancestors
            ancestors.push(...findAncestors(id));
        }
    });
    
    return ancestors;
}

// Find all descendants of a person
function findDescendants(personId) {
    const descendants = [];
    const person = familyData[personId];
    if (!person || !person.children) return descendants;
    
    person.children.forEach(childId => {
        descendants.push(childId);
        // Recursively find their descendants
        descendants.push(...findDescendants(childId));
    });
    
    return descendants;
}

// Initialize the family tree when page loads
document.addEventListener('DOMContentLoaded', () => {
    renderFamilyTree();
    setupSearch();
});

