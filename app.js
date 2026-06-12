/* ==========================================================================
   DyeSafe Color Chemical Scanner Logic
   ========================================================================== */

// 1. Artificial Food Dye Database
const DYE_DATABASE = {
    red: {
        name: "Red 40 (Allura Red AC)",
        formula: "C18H14N2Na2O8S2",
        class: "Azo Dye (Petroleum Derived)",
        commonName: "Allura Red AC, Food Red 17",
        iupac: "Disodium 6-hydroxy-5-((2-methoxy-5-methyl-4-sulfonatophenyl)azo)naphthalene-2-sulfonate",
        source: "Petroleum / Coal Tar distillation",
        riskLevel: "HIGH RISK",
        warningTitle: "HYPERACTIVITY & ADHD ALERT",
        warningDesc: "Linked to severe behavioral changes, impulsivity, and attention deficit (ADHD symptoms) in children. May contain p-Cresidine, a known carcinogen.",
        warningImg: "./assets/hyperactivity_warning.png",
        hazards: [
            "Triggers hyperactivity, impulsivity, and ADHD symptoms in young children.",
            "Synthesized from petroleum derivatives; contains chemical precursors linked to tumor growth.",
            "Can cause severe hives, skin swelling, and breathing difficulty in sensitive individuals."
        ],
        restrictions: {
            eu: "Warning Label Required",
            us: "FDA Approved (Certification Required)",
            intl: "Banned in Switzerland & Norway"
        },
        restrictionNote: "The EU requires all foods with Red 40 to carry a warning label stating: 'May have an adverse effect on activity and attention in children.'",
        swapDye: "Organic Beetroot Juice / Powder",
        swapRecipe: "Boil freshly grated beetroot in water, strain out the solids, and reduce to form a concentrated deep-pink syrup. Perfect for pink frostings and ice creams.",
        swapBenefits: "Rich in betalain antioxidants and nitrates which support healthy cardiovascular blood flow. Zero behavioral risks."
    },
    orange: {
        name: "Yellow 6 (Sunset Yellow FCF)",
        formula: "C16H10N2Na2O7S2",
        class: "Azo Dye (Petroleum Derived)",
        commonName: "Sunset Yellow FCF, Orange Yellow S",
        iupac: "Disodium 6-hydroxy-5-((4-sulfophenyl)azo)naphthalene-2-sulfonate",
        source: "Petroleum synthesis",
        riskLevel: "HIGH RISK",
        warningTitle: "ALLERGIC & ASTHMA RISK",
        warningDesc: "Triggers intense allergic flare-ups, gastric discomfort, and hives. Associated with adrenal gland tumors and hyperactivity in children.",
        warningImg: "./assets/allergy_warning.png",
        hazards: [
            "Known allergen that triggers severe asthma attacks and nasal congestion.",
            "Linked to chromosomal damage and cell mutations in animal testing.",
            "Classified as a catalyst for childhood hyperactivity and behavioral degradation."
        ],
        restrictions: {
            eu: "Warning Label Required",
            us: "FDA Approved (Regulated)",
            intl: "Banned in Norway & Finland"
        },
        restrictionNote: "Subject to strict labeling laws in Europe. Replaced by natural carotenoids in most European confections.",
        swapDye: "Organic Carrot / Annatto Extract",
        swapRecipe: "Juice fresh carrots and simmer to reduce, or heat annatto seeds gently in organic coconut oil to extract a rich, warm orange dye.",
        swapBenefits: "Loaded with Beta-carotene (Vitamin A precursor) which promotes optimal vision, immune health, and cellular repair."
    },
    yellow: {
        name: "Yellow 5 (Tartrazine)",
        formula: "C16H9N4Na3O9S2",
        class: "Azo Dye (Petroleum Derived)",
        commonName: "Tartrazine, Hydrazine Yellow",
        iupac: "Trisodium 5-hydroxy-1-(4-sulfonatophenyl)-4-((4-sulfonatophenyl)azo)-1H-pyrazole-3-carboxylate",
        source: "Coal Tar / Crude Oil derivative",
        riskLevel: "HIGH RISK",
        warningTitle: "NEUROTOXICITY & ADHD ALERT",
        warningDesc: "Strongly correlated with learning disabilities, anxiety, and hyperactivity in kids. Can cause cross-sensitivity reactions in aspirin-sensitive patients.",
        warningImg: "./assets/hyperactivity_warning.png",
        hazards: [
            "Causes severe hyperactivity, sleep disturbances, and aggression in children.",
            "Triggers cross-allergy reactions, particularly in individuals sensitive to aspirin.",
            "Suspected in lab studies to cause DNA damage and cell structural mutations."
        ],
        restrictions: {
            eu: "Warning Label Required",
            us: "FDA Approved (Decl. Required)",
            intl: "Restricted in Austria & Germany"
        },
        restrictionNote: "Europe requires a warning label for Yellow 5. Many international brands formulate yellow confections with turmeric for the European market.",
        swapDye: "Organic Turmeric / Saffron Extract",
        swapRecipe: "Dissolve organic turmeric powder in warm water or steep saffron threads in hot organic milk to yield a brilliant, golden yellow color.",
        swapBenefits: "Turmeric contains Curcumin, a highly potent anti-inflammatory compound that boosts brain function and joint health."
    },
    green: {
        name: "Green 3 (Fast Green FCF)",
        formula: "C37H34N2Na2O10S3",
        class: "Triarylmethane Dye",
        commonName: "Fast Green FCF, Food Green 3",
        iupac: "Dihydrogen (ethyl)[4-[[4-[ethyl(3-sulfonatobenzyl)amino]phenyl](4-hydroxy-2-sulfonatophenyl)methylene]cyclohexa-2,5-dien-1-ylidene](3-sulfonatobenzyl)ammonium, disodium salt",
        source: "Coal Tar derivative",
        riskLevel: "HIGH RISK",
        warningTitle: "ORGAN & TUMOR RISK WARNING",
        warningDesc: "Linked to bladder and testes tumor development in laboratory animal research. Can irritate eyes, skin, and upper respiratory tract.",
        warningImg: "./assets/organ_stress_warning.png",
        hazards: [
            "Correlated with increased rates of bladder and testicular tumors in rodent assays.",
            "Not well absorbed by the digestive tract, causing irritation and inflammation of the gut.",
            "Banned in the European Union due to safety profile uncertainties."
        ],
        restrictions: {
            eu: "BANNED in Food Products",
            us: "FDA Approved (Restricted)",
            intl: "Banned in EU, Japan, & Canada"
        },
        restrictionNote: "Green 3 is one of the most heavily restricted dyes globally. It is strictly prohibited in foods throughout the European Union.",
        swapDye: "Organic Matcha / Spirulina Powder",
        swapRecipe: "Whisk premium culinary-grade matcha green tea powder or organic spirulina powder directly into cake batters or ice cream bases for a deep green hue.",
        swapBenefits: "Matcha is packed with catechins and L-theanine, promoting calm focus and cellular defense. Spirulina provides iron and trace minerals."
    },
    blue: {
        name: "Blue 1 (Brilliant Blue FCF)",
        formula: "C37H34N2Na2O9S3",
        class: "Triarylmethane Dye",
        commonName: "Brilliant Blue FCF, Acid Blue 9",
        iupac: "Disodium ethyl [4-[[4-[ethyl(3-sulfolatobenzyl)amino]phenyl](2-sulfolatophenyl)methylene]cyclohexa-2,5-dien-1-ylidene](3-sulfolatobenzyl)ammonium",
        source: "Coal Tar distillation",
        riskLevel: "HIGH RISK",
        warningTitle: "CELLULAR & ORGAN TOXICITY",
        warningDesc: "Crosses the blood-brain barrier. Linked to chromosomal damage, severe allergic asthma, and neurological disruptions in lab studies.",
        warningImg: "./assets/organ_stress_warning.png",
        hazards: [
            "Able to cross the blood-brain barrier, raising concerns regarding neurochemical stability.",
            "Associated with respiratory bronchoconstriction (asthma attacks) and skin hives.",
            "Can inhibit mitochondrial respiration, reducing cellular energy production."
        ],
        restrictions: {
            eu: "Approved with Limits",
            us: "FDA Approved (Certification Required)",
            intl: "Banned in France & Austria"
        },
        restrictionNote: "Permitted in the EU only with strict maximum concentration limits. Banned entirely in several European nations in the past.",
        swapDye: "Organic Blue Spirulina / Butterfly Pea Flower",
        swapRecipe: "Steep dried Butterfly Pea Flowers in hot water to extract a cobalt-blue liquid, or dissolve blue spirulina powder into milk/coconut base for ice cream.",
        swapBenefits: "Butterfly Pea Flower contains proanthocyanidins which fight inflammation and improve brain circulation. Superfood antioxidant benefits."
    },
    purple: {
        name: "Purple Mix (Red 40 + Blue 1)",
        formula: "Combined Chemical Complex",
        class: "Azo & Triarylmethane Combination",
        commonName: "Synthetic Violet Blend",
        iupac: "Mixture of Disodium Allura Red and Disodium Brilliant Blue",
        source: "Synthesized synthetic blend",
        riskLevel: "HIGH RISK",
        warningTitle: "COMBINED CHEMICAL TOXICITY",
        warningDesc: "Combines the behavioral risk of Red 40 with the neurotoxicity/cellular strain of Blue 1. Synergistic effects are suspected to increase allergenicity.",
        warningImg: "./assets/organ_stress_warning.png",
        hazards: [
            "Synergistic chemical cocktail effect; multiple dyes overload detoxification organs (liver/kidneys).",
            "Triggers child hyperactivity (ADHD symptoms) due to the Red 40 component.",
            "High risk of respiratory congestion, skin sensitivity, and mitochondrial cell stress."
        ],
        restrictions: {
            eu: "Multiple Warnings Required",
            us: "FDA Approved Blends",
            intl: "Strictly regulated globally"
        },
        restrictionNote: "Because it contains Red 40, food products sold in Europe containing this purple blend must explicitly display the ADHD warning.",
        swapDye: "Organic Blueberry / Purple Sweet Potato",
        swapRecipe: "Simmer organic blueberries with a splash of water and mash, then strain the pulp. Alternatively, steam and puree purple sweet potato for a creamy violet frosting.",
        swapBenefits: "Blueberries are loaded with anthocyanins, which boost memory and cognitive function while defending against cellular stress."
    }
};

// 2. DOM Elements
const webcam = document.getElementById("webcam");
const previewImage = document.getElementById("preview-image");
const cameraViewport = document.getElementById("camera-viewport");
const staticViewport = document.getElementById("static-viewport");
const analysisCanvas = document.getElementById("analysis-canvas");
const pickerTarget = document.getElementById("color-picker-target");

// Control buttons
const btnCapture = document.getElementById("btn-capture");
const btnToggleCamera = document.getElementById("btn-toggle-camera");
const btnRecapture = document.getElementById("btn-recapture");
const cameraControls = document.getElementById("camera-controls");
const staticControls = document.getElementById("static-controls");
const fileInput = document.getElementById("file-input");
const fileLabel = document.getElementById("file-label");

// Results display elements
const welcomeCard = document.getElementById("welcome-card");
const resultsWrapper = document.getElementById("results-wrapper");
const colorSwatch = document.getElementById("color-swatch");
const colorHex = document.getElementById("color-hex");
const dyeName = document.getElementById("dye-name");
const dyeFormula = document.getElementById("dye-formula");
const dyeClass = document.getElementById("dye-class");

const warningImage = document.getElementById("warning-image");
const warningTitle = document.getElementById("warning-title");
const warningDesc = document.getElementById("warning-desc");

const dyeCommonName = document.getElementById("dye-common-name");
const dyeIupac = document.getElementById("dye-iupac");
const dyeSource = document.getElementById("dye-source");
const dyeRiskIndicator = document.getElementById("dye-risk-indicator");
const dyeHazardsList = document.getElementById("dye-hazards-list");

const statusEu = document.getElementById("status-eu");
const statusUs = document.getElementById("status-us");
const statusIntl = document.getElementById("status-intl");
const restrictionNote = document.getElementById("restriction-note");

const badgeEu = document.getElementById("badge-eu");
const badgeUs = document.getElementById("badge-us");
const badgeIntl = document.getElementById("badge-intl");

const swapDye = document.getElementById("swap-dye");
const swapRecipe = document.getElementById("swap-recipe");
const swapBenefits = document.getElementById("swap-benefits");

// 3. State variables
let stream = null;
let useBackCamera = true;
let capturedImage = null; // HTMLImageElement or Canvas representation

// 4. Initialize Camera Stream
async function initCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }

    const constraints = {
        video: {
            facingMode: useBackCamera ? "environment" : "user",
            width: { ideal: 1280 },
            height: { ideal: 720 }
        },
        audio: false
    };

    try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        webcam.srcObject = stream;
        
        // Show camera viewport, hide static viewport
        cameraViewport.classList.add("active");
        staticViewport.classList.remove("active");
        cameraControls.classList.remove("hidden");
        staticControls.classList.add("hidden");
        pickerTarget.classList.add("hidden");
    } catch (err) {
        console.warn("Camera access denied or unavailable: ", err);
        // If camera fails, fail gracefully and encourage image upload
        showUploadModeOnly();
    }
}

function showUploadModeOnly() {
    cameraViewport.classList.remove("active");
    staticViewport.classList.add("active");
    cameraControls.classList.add("hidden");
    staticControls.classList.add("hidden");
    
    // Set a placeholder image in static viewport to guide user
    previewImage.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><rect width='100%' height='100%' fill='%2312151e'/><text x='50%' y='45%' dominant-baseline='middle' text-anchor='middle' fill='%23a0a8c0' font-family='sans-serif' font-size='22px' font-weight='bold'>Camera Stream Unavailable</text><text x='50%' y='53%' dominant-baseline='middle' text-anchor='middle' fill='%23707890' font-family='sans-serif' font-size='16px'>Please upload a photo of a cake or ice cream to start scanning!</text></svg>";
}

// Toggle Camera facing mode
btnToggleCamera.addEventListener("click", () => {
    useBackCamera = !useBackCamera;
    initCamera();
});

// Capture Frame from Camera
btnCapture.addEventListener("click", () => {
    if (!stream) return;

    // Draw video frame to hidden canvas
    const width = webcam.videoWidth;
    const height = webcam.videoHeight;
    analysisCanvas.width = width;
    analysisCanvas.height = height;
    
    const ctx = analysisCanvas.getContext("2d");
    ctx.drawImage(webcam, 0, 0, width, height);

    // Convert canvas to image and show in static viewport
    const dataUrl = analysisCanvas.toDataURL("image/png");
    previewImage.src = dataUrl;

    // Stop camera stream to save power/resources while viewing still image
    stream.getTracks().forEach(track => track.stop());
    stream = null;

    // Toggle viewport visibility
    cameraViewport.classList.remove("active");
    staticViewport.classList.add("active");
    cameraControls.classList.add("hidden");
    staticControls.classList.remove("hidden");
    pickerTarget.classList.add("hidden");
});

// Recapture / Reset back to live stream
btnRecapture.addEventListener("click", () => {
    resetAnalysis();
    initCamera();
});

// 5. Image File Upload Handler
fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        // Stop current webcam stream if any
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            stream = null;
        }

        const img = new Image();
        img.onload = function() {
            // Draw uploaded image to offscreen analysis canvas
            analysisCanvas.width = img.width;
            analysisCanvas.height = img.height;
            const ctx = analysisCanvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            // Update UI preview
            previewImage.src = event.target.result;

            // Show static viewport
            cameraViewport.classList.remove("active");
            staticViewport.classList.add("active");
            cameraControls.classList.add("hidden");
            staticControls.classList.remove("hidden");
            pickerTarget.classList.add("hidden");

            // Reset analysis layout
            resetAnalysis();
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

// 6. Color Selection & Analysis
previewImage.addEventListener("click", (e) => {
    // Get image bounding rect
    const rect = previewImage.getBoundingClientRect();
    
    // Calculate click coordinates relative to the rendered image element (0 to 1 scale)
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;

    // Map relative coordinates back to actual canvas dimensions
    const canvasX = Math.floor(relX * analysisCanvas.width);
    const canvasY = Math.floor(relY * analysisCanvas.height);

    // Get pixel color data from canvas
    const ctx = analysisCanvas.getContext("2d");
    try {
        const pixelData = ctx.getImageData(canvasX, canvasY, 1, 1).data;
        const r = pixelData[0];
        const g = pixelData[1];
        const b = pixelData[2];
        
        const hex = rgbToHex(r, g, b);
        const hsl = rgbToHsl(r, g, b);

        // Position Picker Target Icon on UI
        const viewX = relX * 100;
        const viewY = relY * 100;
        pickerTarget.style.left = `${viewX}%`;
        pickerTarget.style.top = `${viewY}%`;
        pickerTarget.classList.remove("hidden");

        // Run matching logic
        analyzeColor(r, g, b, hsl, hex);
    } catch (err) {
        console.error("Failed to extract color pixel data: ", err);
    }
});

// Reset results screen
function resetAnalysis() {
    pickerTarget.classList.add("hidden");
    welcomeCard.classList.remove("hidden");
    resultsWrapper.classList.add("hidden");
    
    // Reset accent color back to default
    document.documentElement.style.setProperty('--accent-color', '#00ffcc');
    document.documentElement.style.setProperty('--accent-glow', 'rgba(0, 255, 204, 0.25)');
}

// 7. Color Math Helpers
function rgbToHex(r, g, b) {
    const toHex = (c) => {
        const hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };
    return "#" + toHex(r) + toHex(g) + toHex(b);
}

function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

// 8. Analyze Color & Match Chemical Dyes
function analyzeColor(r, g, b, hsl, hex) {
    const { h, s, l } = hsl;
    let dyeKey = null;

    // Classification criteria based on HSL thresholds:
    // 1. Detect Neutral (low saturation or extremely dark/light colors)
    if (s < 18 || l < 12 || l > 92) {
        showNeutralWarning(hex);
        return;
    }

    // 2. Classify colors by Hue wheel
    if (h >= 335 || h < 15) {
        // Red / Pink
        dyeKey = "red";
    } else if (h >= 15 && h < 45) {
        // Orange
        dyeKey = "orange";
    } else if (h >= 45 && h < 75) {
        // Yellow
        dyeKey = "yellow";
    } else if (h >= 75 && h < 165) {
        // Green
        dyeKey = "green";
    } else if (h >= 165 && h < 255) {
        // Blue
        dyeKey = "blue";
    } else if (h >= 255 && h < 335) {
        // Purple / Violet
        dyeKey = "purple";
    }

    if (dyeKey && DYE_DATABASE[dyeKey]) {
        renderDyeResults(DYE_DATABASE[dyeKey], hex);
    } else {
        showNeutralWarning(hex);
    }
}

// Alert user if clicking neutrals
function showNeutralWarning(hex) {
    welcomeCard.classList.remove("hidden");
    resultsWrapper.classList.add("hidden");
    
    // Create temporary alert alert box
    const tipText = welcomeCard.querySelector(".tips-box");
    const originalContent = tipText.innerHTML;
    
    tipText.style.borderColor = "var(--danger-red)";
    tipText.innerHTML = `
        <h3 style="color: var(--danger-red)">⚠️ Scan Warning: Neutral Color Detected</h3>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.8rem;">
            You selected <strong>${hex}</strong> which is classified as a neutral color (white, black, gray, or brown).
        </p>
        <p style="font-size: 0.85rem; color: var(--text-primary); font-weight: 500;">
            Please tap on a bright, highly-saturated artificial color (such as bright pink, neon blue, electric yellow, or vibrant green icing) to analyze its synthetic food chemicals!
        </p>
    `;
    
    // Restore tips box after 6 seconds
    setTimeout(() => {
        tipText.style.borderColor = "var(--card-border)";
        tipText.innerHTML = originalContent;
    }, 6000);
}

// 9. Render Analysis Results to DOM
function renderDyeResults(dye, hex) {
    welcomeCard.classList.add("hidden");
    resultsWrapper.classList.remove("hidden");

    // Dynamic Theme Coloring: updates site accent to match the scanned color!
    document.documentElement.style.setProperty('--accent-color', hex);
    
    // Convert hex to semi-transparent glow
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    document.documentElement.style.setProperty('--accent-glow', `rgba(${r}, ${g}, ${b}, 0.25)`);

    // Identity Card
    colorSwatch.style.backgroundColor = hex;
    colorHex.textContent = hex;
    dyeName.textContent = dye.name;
    dyeFormula.textContent = dye.formula;
    dyeClass.textContent = dye.class;

    // Cigarette packet warning card
    warningImage.src = dye.warningImg;
    warningTitle.textContent = dye.warningTitle;
    warningDesc.textContent = dye.warningDesc;

    // Technical Profile
    dyeCommonName.textContent = dye.commonName;
    dyeIupac.textContent = dye.iupac;
    dyeSource.textContent = dye.source;
    
    // Risk status
    dyeRiskIndicator.textContent = dye.riskLevel;
    if (dye.riskLevel === "HIGH RISK") {
        dyeRiskIndicator.style.background = "rgba(255, 56, 56, 0.15)";
        dyeRiskIndicator.style.borderColor = "var(--danger-red)";
        dyeRiskIndicator.style.color = "var(--danger-red)";
    } else {
        dyeRiskIndicator.style.background = "rgba(241, 196, 15, 0.15)";
        dyeRiskIndicator.style.borderColor = "#f1c40f";
        dyeRiskIndicator.style.color = "#f1c40f";
    }

    // Bullet Hazards list
    dyeHazardsList.innerHTML = "";
    dye.hazards.forEach(hazard => {
        const li = document.createElement("li");
        li.textContent = hazard;
        dyeHazardsList.appendChild(li);
    });

    // Regulatory Badges
    statusEu.textContent = dye.restrictions.eu;
    statusUs.textContent = dye.restrictions.us;
    statusIntl.textContent = dye.restrictions.intl;
    restrictionNote.innerHTML = dye.restrictionNote;

    // Color code regulatory badges based on restrictions
    styleBadge(badgeEu, dye.restrictions.eu);
    styleBadge(badgeUs, dye.restrictions.us);
    styleBadge(badgeIntl, dye.restrictions.intl);

    // Organic swaps
    swapDye.textContent = dye.swapDye;
    swapRecipe.textContent = dye.swapRecipe;
    swapBenefits.textContent = dye.swapBenefits;

    // Smooth scroll down to results on small screens
    if (window.innerWidth <= 1024) {
        resultsWrapper.scrollIntoView({ behavior: 'smooth' });
    }
}

// Badge coloring helper
function styleBadge(badgeElement, text) {
    badgeElement.classList.remove("alert", "warn");
    const t = text.toLowerCase();
    
    if (t.includes("banned") || t.includes("prohibited")) {
        badgeElement.classList.add("alert");
    } else if (t.includes("warning") || t.includes("restricted") || t.includes("limit")) {
        badgeElement.classList.add("warn");
    }
}

// Initialize on page load
window.addEventListener("DOMContentLoaded", () => {
    initCamera();
});
