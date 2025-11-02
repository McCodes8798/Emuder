// Family tree data structure - Simple flat structure
const familyData = {
    grandfather: {
        id: 'grandfather',
        name: 'Grandfather Name',
        image: 'images/grandfather.jpg',
        yearBorn: 1920,
        yearPassed: 2010,
        children: ['pulkeria', 'mamertha', 'emile', 'jacques', 'arsene', 'methode', 'noella', 'pacifique']
    },
    grandmother: {
        id: 'grandmother',
        name: 'Grandmother Name',
        image: 'images/grandmother.jpg',
        yearBorn: 1925,
        yearPassed: null,
        children: ['pulkeria', 'mamertha', 'emile', 'jacques', 'arsene', 'methode', 'noella', 'pacifique']
    },
    
    // Pulkeria - 9 children
    pulkeria: {
        id: 'pulkeria',
        name: 'Pulkeria',
        image: 'images/profile_image.png',
        yearBorn: 1950,
        yearPassed: null,
        children: ['p_child1', 'p_child2', 'p_child3', 'p_child4', 'p_child5', 'p_child6', 'p_child7', 'p_child8', 'p_child9']
    },
    p_child1: { id: 'p_child1', name: 'Pulkeria Child 1', image: 'images/profile_image.png', yearBorn: 1975, yearPassed: null, children: [] },
    p_child2: { id: 'p_child2', name: 'Pulkeria Child 2', image: 'images/profile_image.png', yearBorn: 1977, yearPassed: null, children: [] },
    p_child3: { id: 'p_child3', name: 'Pulkeria Child 3', image: 'images/profile_image.png', yearBorn: 1979, yearPassed: null, children: [] },
    p_child4: { id: 'p_child4', name: 'Pulkeria Child 4', image: 'images/profile_image.png', yearBorn: 1981, yearPassed: null, children: [] },
    p_child5: { id: 'p_child5', name: 'Pulkeria Child 5', image: 'images/profile_image.png', yearBorn: 1983, yearPassed: null, children: [] },
    p_child6: { id: 'p_child6', name: 'Pulkeria Child 6', image: 'images/profile_image.png', yearBorn: 1985, yearPassed: null, children: [] },
    p_child7: { id: 'p_child7', name: 'Pulkeria Child 7', image: 'images/profile_image.png', yearBorn: 1987, yearPassed: null, children: [] },
    p_child8: { id: 'p_child8', name: 'Pulkeria Child 8', image: 'images/profile_image.png', yearBorn: 1989, yearPassed: null, children: [] },
    p_child9: { id: 'p_child9', name: 'Pulkeria Child 9', image: 'images/profile_image.png', yearBorn: 1991, yearPassed: null, children: [] },
    
    // Mamertha - 7 children
    mamertha: {
        id: 'mamertha',
        name: 'Mamertha',
        image: 'images/profile_image.png',
        yearBorn: 1952,
        yearPassed: null,
        children: ['m_child1', 'm_child2', 'm_child3', 'm_child4', 'm_child5', 'm_child6', 'm_child7']
    },
    m_child1: { id: 'm_child1', name: 'Mamertha Child 1', image: 'images/profile_image.png', yearBorn: 1976, yearPassed: null, children: [] },
    m_child2: { id: 'm_child2', name: 'Mamertha Child 2', image: 'images/profile_image.png', yearBorn: 1978, yearPassed: null, children: [] },
    m_child3: { id: 'm_child3', name: 'Mamertha Child 3', image: 'images/profile_image.png', yearBorn: 1980, yearPassed: null, children: [] },
    m_child4: { id: 'm_child4', name: 'Mamertha Child 4', image: 'images/profile_image.png', yearBorn: 1982, yearPassed: null, children: [] },
    m_child5: { id: 'm_child5', name: 'Mamertha Child 5', image: 'images/profile_image.png', yearBorn: 1984, yearPassed: null, children: [] },
    m_child6: { id: 'm_child6', name: 'Mamertha Child 6', image: 'images/profile_image.png', yearBorn: 1986, yearPassed: null, children: [] },
    m_child7: { id: 'm_child7', name: 'Mamertha Child 7', image: 'images/profile_image.png', yearBorn: 1988, yearPassed: null, children: [] },
    
    // Emile - 6 children
    emile: {
        id: 'emile',
        name: 'Emile',
        image: 'images/profile_image.png',
        yearBorn: 1954,
        yearPassed: null,
        children: ['e_child1', 'e_child2', 'e_child3', 'e_child4', 'e_child5', 'e_child6']
    },
    e_child1: { id: 'e_child1', name: 'Emile Child 1', image: 'images/profile_image.png', yearBorn: 1977, yearPassed: null, children: [] },
    e_child2: { id: 'e_child2', name: 'Emile Child 2', image: 'images/profile_image.png', yearBorn: 1979, yearPassed: null, children: [] },
    e_child3: { id: 'e_child3', name: 'Emile Child 3', image: 'images/profile_image.png', yearBorn: 1981, yearPassed: null, children: [] },
    e_child4: { id: 'e_child4', name: 'Emile Child 4', image: 'images/profile_image.png', yearBorn: 1983, yearPassed: null, children: [] },
    e_child5: { id: 'e_child5', name: 'Emile Child 5', image: 'images/profile_image.png', yearBorn: 1985, yearPassed: null, children: [] },
    e_child6: { id: 'e_child6', name: 'Emile Child 6', image: 'images/profile_image.png', yearBorn: 1987, yearPassed: null, children: [] },
    
    // Jacques - 6 children
    jacques: {
        id: 'jacques',
        name: 'Jacques',
        image: 'images/profile_image.png',
        yearBorn: 1956,
        yearPassed: null,
        children: ['j_child1', 'j_child2', 'j_child3', 'j_child4', 'j_child5', 'j_child6']
    },
    j_child1: { id: 'j_child1', name: 'Jacques Child 1', image: 'images/profile_image.png', yearBorn: 1978, yearPassed: null, children: [] },
    j_child2: { id: 'j_child2', name: 'Jacques Child 2', image: 'images/profile_image.png', yearBorn: 1980, yearPassed: null, children: [] },
    j_child3: { id: 'j_child3', name: 'Jacques Child 3', image: 'images/profile_image.png', yearBorn: 1982, yearPassed: null, children: [] },
    j_child4: { id: 'j_child4', name: 'Jacques Child 4', image: 'images/profile_image.png', yearBorn: 1984, yearPassed: null, children: [] },
    j_child5: { id: 'j_child5', name: 'Jacques Child 5', image: 'images/profile_image.png', yearBorn: 1986, yearPassed: null, children: [] },
    j_child6: { id: 'j_child6', name: 'Jacques Child 6', image: 'images/profile_image.png', yearBorn: 1988, yearPassed: null, children: [] },
    
    // Arsene - 4 children
    arsene: {
        id: 'arsene',
        name: 'Arsene',
        image: 'images/profile_image.png',
        yearBorn: 1958,
        yearPassed: null,
        children: ['a_child1', 'a_child2', 'a_child3', 'a_child4']
    },
    a_child1: { id: 'a_child1', name: 'Arsene Child 1', image: 'images/profile_image.png', yearBorn: 1980, yearPassed: null, children: [] },
    a_child2: { id: 'a_child2', name: 'Arsene Child 2', image: 'images/profile_image.png', yearBorn: 1982, yearPassed: null, children: [] },
    a_child3: { id: 'a_child3', name: 'Arsene Child 3', image: 'images/profile_image.png', yearBorn: 1984, yearPassed: null, children: [] },
    a_child4: { id: 'a_child4', name: 'Arsene Child 4', image: 'images/profile_image.png', yearBorn: 1986, yearPassed: null, children: [] },
    
    // Methode - 5 children
    methode: {
        id: 'methode',
        name: 'Methode',
        image: 'images/profile_image.png',
        yearBorn: 1960,
        yearPassed: null,
        children: ['me_child1', 'me_child2', 'me_child3', 'me_child4', 'me_child5']
    },
    me_child1: { id: 'me_child1', name: 'Methode Child 1', image: 'images/profile_image.png', yearBorn: 1982, yearPassed: null, children: [] },
    me_child2: { id: 'me_child2', name: 'Methode Child 2', image: 'images/profile_image.png', yearBorn: 1984, yearPassed: null, children: [] },
    me_child3: { id: 'me_child3', name: 'Methode Child 3', image: 'images/profile_image.png', yearBorn: 1986, yearPassed: null, children: [] },
    me_child4: { id: 'me_child4', name: 'Methode Child 4', image: 'images/profile_image.png', yearBorn: 1988, yearPassed: null, children: [] },
    me_child5: { id: 'me_child5', name: 'Methode Child 5', image: 'images/profile_image.png', yearBorn: 1990, yearPassed: null, children: [] },
    
    // Noella - 2 children (YOUR FAMILY)
    noella: {
        id: 'noella',
        name: 'Noella',
        image: 'images/profile_image.png',
        yearBorn: 1962,
        yearPassed: null,
        children: ['n_child1', 'n_child2']
    },
    n_child1: { id: 'n_child1', name: 'Emmanuel', image: 'images/profile_image.png', yearBorn: 1990, yearPassed: null, children: [] },
    n_child2: { id: 'n_child2', name: 'Christophe', image: 'images/christophe.jpg', yearBorn: 1992, yearPassed: null, location: 'Boston, MA', children: ['you_child1', 'you_child2'] },
    you_child1: { id: 'you_child1', name: 'Daniel', image: 'images/Daniel.jpg', yearBorn: 2020, yearPassed: null, children: [] },
    you_child2: { id: 'you_child2', name: 'Samuel', image: 'images/Samuel.jpg', yearBorn: 2022, yearPassed: null, children: [] },
    
    // Pacifique - 4 children
    pacifique: {
        id: 'pacifique',
        name: 'Pacifique',
        image: 'images/profile_image.png',
        yearBorn: 1964,
        yearPassed: null,
        children: ['pa_child1', 'pa_child2', 'pa_child3', 'pa_child4']
    },
    pa_child1: { id: 'pa_child1', name: 'Pacifique Child 1', image: 'images/profile_image.png', yearBorn: 1986, yearPassed: null, children: [] },
    pa_child2: { id: 'pa_child2', name: 'Pacifique Child 2', image: 'images/profile_image.png', yearBorn: 1988, yearPassed: null, children: [] },
    pa_child3: { id: 'pa_child3', name: 'Pacifique Child 3', image: 'images/profile_image.png', yearBorn: 1990, yearPassed: null, children: [] },
    pa_child4: { id: 'pa_child4', name: 'Pacifique Child 4', image: 'images/profile_image.png', yearBorn: 1992, yearPassed: null, children: [] }
};
