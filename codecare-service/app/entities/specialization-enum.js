export const Specializations = [
    {
        code: "GENERAL_MEDICINE",
        name: "General Medicine",
        description: "Covers a wide range of illnesses affecting adults, not limited to any specific organ or disease type."
    },
    {
        code: "CARDIOLOGY",
        name: "Cardiology",
        description: "Deals with heart-related disorders and circulatory system issues."
    },
    {
        code: "ENDOCRINOLOGY",
        name: "Endocrinology",
        description: "Focuses on hormone-related diseases and endocrine gland disorders."
    },
    {
        code: "GASTROENTEROLOGY",
        name: "Gastroenterology",
        description: "Concerned with the digestive system and its disorders."
    },
    {
        code: "HEMATOLOGY",
        name: "Hematology",
        description: "Focuses on blood, blood-forming organs, and blood diseases."
    },
    {
        code: "INFECTIOUS_DISEASE",
        name: "Infectious Disease",
        description: "Specializes in diseases caused by bacteria, viruses, fungi, or parasites."
    },
    {
        code: "NEPHROLOGY",
        name: "Nephrology",
        description: "Concerned with kidney conditions and their treatment."
    },
    {
        code: "NEUROLOGY",
        name: "Neurology",
        description: "Deals with disorders of the nervous system."
    },
    {
        code: "ONCOLOGY",
        name: "Oncology",
        description: "Focuses on the diagnosis and treatment of cancer."
    },
    {
        code: "OPHTHALMOLOGY",
        name: "Ophthalmology",
        description: "Deals with eye diseases and visual system disorders."
    },
    {
        code: "ORTHOPEDICS",
        name: "Orthopedics",
        description: "Focuses on deformities, injuries, and diseases of the bone and muscle systems."
    },
    {
        code: "OTOLARYNGOLOGY",
        name: "Otolaryngology",
        description: "Concerned with disorders and conditions of the ear, nose, and throat (ENT)."
    },
    {
        code: "PEDIATRICS",
        name: "Pediatrics",
        description: "Deals with medical care of infants, children, and adolescents."
    },
    {
        code: "PSYCHIATRY",
        name: "Psychiatry",
        description: "Focuses on the diagnosis, treatment, and prevention of mental illnesses."
    },
    {
        code: "PULMONOLOGY",
        name: "Pulmonology",
        description: "Pertains to lung and respiratory tract conditions."
    },
    {
        code: "RADIOLOGY",
        name: "Radiology",
        description: "Uses imaging to diagnose and sometimes treat diseases within the body."
    },
    {
        code: "UROLOGY",
        name: "Urology",
        description: "Focuses on urinary tract diseases and disorders of the male reproductive organs."
    },
    {
        code: "OBSTETRICS_AND_GYNECOLOGY",
        name: "Obstetrics and Gynecology",
        description: "Deals with reproductive health and childbirth."
    },
    {
        code: "SURGERY",
        name: "Surgery",
        description: "Involves operative and instrumental techniques to investigate and treat a pathological condition such as disease or injury."
    },
    {
        code: "ANESTHESIOLOGY",
        name: "Anesthesiology",
        description: "Focuses on pain relief during surgery and other medical procedures."
    },
    {
        code: "PATHOLOGY",
        name: "Pathology",
        description: "Studies the causes and effects of diseases, especially the branch of medicine that deals with the laboratory examination of samples of body tissue for diagnostic or forensic purposes."
    },
    {
        code: "RHEUMATOLOGY",
        name: "Rheumatology",
        description: "Deals with the diagnosis and therapy of rheumatic diseases."
    },
    {
        code: "PHYSICAL_MEDICINE_AND_REHABILITATION",
        name: "Physical Medicine and Rehabilitation",
        description: "Aims to enhance and restore functional ability and quality of life to those with physical impairments or disabilities."
    },
    {
        code: "ALLERGY_AND_IMMUNOLOGY",
        name: "Allergy and Immunology",
        description: "Deals with the treatment of immune system disorders such as allergies, asthma, inherited immunodeficiency diseases, and autoimmune diseases."
    },
    {
        code: "GERIATRICS",
        name: "Geriatrics",
        description: "Focuses on health care of elderly people, aiming to promote health and to prevent and treat diseases and disabilities in older adults."
    },
    {
        code: "CRITICAL_CARE_MEDICINE",
        name: "Critical Care Medicine",
        description: "Deals with life-threatening conditions requiring sophisticated organ support and invasive monitoring."
    },
    {
        code: "ENDOCRINE_SURGERY",
        name: "Endocrine Surgery",
        description: "Specializes in the surgical treatment of endocrine diseases."
    },
    {
        code: "PAIN_MANAGEMENT",
        name: "Pain Management",
        description: "Focuses on the evaluation, treatment, and prevention of pain."
    },
    {
        code: "GENETICS",
        name: "Genetics",
        description: "Involves the study of genes and heredity in living organisms."
    }
];

export const getCodes = () => {
    return Specializations.map(specialization => specialization.code);
}