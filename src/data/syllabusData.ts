import { Semester } from '../types/syllabus';

export const syllabusData: Semester[] = [
  {
    id: 1,
    name: "Semester I",
    totalCredits: "13+4 (17 Credit Hours)",
    subjects: [
      {
        code: "BI 501",
        name: "Introduction to Bioinformatics & Computational Biology",
        credits: "2+1",
        objective: "To provide theoretical and practical knowledge about genomic data handling, optimization, and data mining in bioinformatics.",
        units: [
          {
            title: "Unit I",
            content: [
              "Genomic resources: NCBI, EBI, EXPASY",
              "Sequence databases: GenBank, EMBL, DDBJ",
              "Algorithms: Needleman-Wunsch, Smith-Waterman, BLAST, FASTA",
              "Scoring matrices: PAM, BLOSUM",
              "Multiple sequence alignment: PRAS, CLUSTALW",
              "Gene prediction and functional identification"
            ]
          },
          {
            title: "Unit II",
            content: [
              "Preprocessing gene expression data",
              "Normalization techniques",
              "Error modeling, imputation",
              "High-throughput screening"
            ]
          },
          {
            title: "Unit III",
            content: [
              "Optimization: Simulated Annealing, Genetic Algorithms",
              "Ab initio structure prediction",
              "Information theory: entropy and relative entropy"
            ]
          },
          {
            title: "Unit IV",
            content: [
              "Machine Learning: supervised vs unsupervised",
              "Cross-validation, Markov Models, Bayesian Inference",
              "Hidden Markov Models (HMMs)",
              "Introduction to WEKA"
            ]
          }
        ],
        practicals: [
          "BLAST, CLUSTALW, Gene prediction tools",
          "HMMs, Gibbs sampling",
          "Expression profiling"
        ]
      },
      {
        code: "MBB 502",
        name: "Fundamentals of Molecular Biology",
        credits: "3+0",
        objective: "Understand DNA/RNA structures and chromatin assembly. Study Central Dogma, cellular processes, mutations, and gene regulation",
        units: [
          {
            title: "Unit 1",
            content: ["Nucleic Acids, DNA forms (A/B/Z), RNA types, DNA topology"]
          },
          {
            title: "Unit 2",
            content: ["Replication, mutations, DNA repair, recombination"]
          },
          {
            title: "Unit 3",
            content: ["Transcription (prokaryotic & eukaryotic), RNA processing"]
          },
          {
            title: "Unit 4",
            content: ["Translation, co/post-translational modifications, stability"]
          },
          {
            title: "Unit 5",
            content: ["Gene regulation: lac/trp operons, RNAi, enhancers/silencers, epigenetics"]
          }
        ]
      },
      {
        code: "BIOCHEM 502",
        name: "Intermediary Metabolism",
        credits: "3+0",
        objective: "To explore metabolic pathways, regulation, disorders, and engineering.",
        units: [
          {
            title: "Block 1",
            content: [
              "Introduction to Metabolism",
              "Biochemical reactions, bioenergetics, signal transduction"
            ]
          },
          {
            title: "Block 2",
            content: [
              "Energy Nutrients Metabolism",
              "Carbohydrates: glycolysis, gluconeogenesis, glyoxylate cycle",
              "Lipids: β-oxidation, ketone bodies, cholesterol synthesis",
              "Proteins: amino acid metabolism, urea cycle",
              "Energy production: OxPhos, ETC, ATP control"
            ]
          },
          {
            title: "Block 3",
            content: [
              "Sulphur & Nucleotide Metabolism",
              "Sulphur assimilation, Purine/Pyrimidine synthesis and degradation"
            ]
          },
          {
            title: "Block 4",
            content: [
              "Metabolic Regulation & Defects",
              "Inborn errors, pathway engineering"
            ]
          }
        ]
      },
      {
        code: "STAT 501",
        name: "Mathematics for Applied Sciences",
        credits: "2+0",
        objective: "Basic mathematics for non-math background students.",
        units: [
          {
            title: "Unit 1",
            content: ["Set theory, functions"]
          },
          {
            title: "Unit 2",
            content: ["Vectors, matrices, eigenvalues"]
          },
          {
            title: "Unit 3",
            content: ["Differentiation, max-min, partial derivatives"]
          },
          {
            title: "Unit 4",
            content: ["Integration, definite/indefinite, differential equations"]
          }
        ]
      },
      {
        code: "STAT 502",
        name: "Statistical Methods for Applied Sciences",
        credits: "3+1",
        objective: "Learn statistical inference, distributions, estimation, regression, ANOVA.",
        units: [
          {
            title: "Unit 1",
            content: ["Descriptive stats, boxplots, probability"]
          },
          {
            title: "Unit 2",
            content: ["Distributions: Binomial, Poisson, Normal, t, χ², F"]
          },
          {
            title: "Unit 3",
            content: ["Estimation, correlation, regression"]
          },
          {
            title: "Unit 4",
            content: ["Non-parametric tests (Sign, Wilcoxon, U-test)"]
          },
          {
            title: "Unit 5",
            content: ["ANOVA, sampling, multivariate analysis"]
          }
        ],
        practicals: [
          "Distribution fitting, confidence intervals",
          "Hypothesis testing, ANOVA"
        ]
      },
      {
        code: "PGS 501",
        name: "Library & Information Services",
        credits: "0+1",
        objective: "Train students in literature survey, search engines, citations, OPAC, databases.",
        units: []
      },
      {
        code: "PGS 502",
        name: "Technical Writing & Communication Skills",
        credits: "0+1",
        objective: "Skills for scientific writing and communication.",
        topics: [
          "Research paper, thesis structure",
          "Abstracts, figures, citations",
          "Grammar, phonetics, interviews, presentations"
        ],
        units: [
          {
            title: "Writing Skills",
            content: [
              "Research paper structure",
              "Abstract writing",
              "Citation formats"
            ]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Semester II",
    totalCredits: "8+4 (12 Credit Hours)",
    subjects: [
      {
        code: "BI 502",
        name: "Statistical Genomics",
        credits: "2+1",
        objective: "Build fundamental understanding of statistical tools in genetics and genomics.",
        units: [
          {
            title: "Unit I",
            content: [
              "Population Genetics: Hardy–Weinberg Law",
              "Systematic forces affecting gene frequency",
              "Quantitative Genetics: Values, Means, Variance",
              "Linkage detection and estimation",
              "Inbreeding, selection, genetic parameter estimation",
              "Variance components, BLUP, G×E interaction, path analysis"
            ]
          },
          {
            title: "Unit II",
            content: [
              "Molecular Marker-Based Classification: Similarity measures, clustering, bootstrapping",
              "QTL Mapping: Single marker analysis",
              "Interval mapping and MQM"
            ]
          },
          {
            title: "Unit III",
            content: [
              "Design and analysis of expression data",
              "Genome selection and prediction",
              "Genetic markers, association mapping",
              "Genome-wide association analysis (GWAS)"
            ]
          }
        ],
        practicals: [
          "Hardy-Weinberg calculations",
          "Linkage and QTL estimation",
          "BLUP, clustering",
          "Gene expression data analysis"
        ]
      },
      {
        code: "BI 503",
        name: "Genome Assembly and Annotation",
        credits: "1+1",
        objective: "Understand practical tools and challenges in genome sequencing and annotation.",
        units: [
          {
            title: "Unit I",
            content: [
              "Sequence data types, shotgun sequencing",
              "Comparative & de novo assembly",
              "Read coverage, sequencing errors, quality matrix",
              "Assembly evaluation and challenges"
            ]
          },
          {
            title: "Unit II",
            content: [
              "Tools: MIRA, Velvet, ABySS, ALLPATHS-LG",
              "Bambus2, Celera Assembler, SGA, SOAPdenovo"
            ]
          },
          {
            title: "Unit III",
            content: [
              "Annotation: ORF identification",
              "Gene structure, regulatory motifs"
            ]
          }
        ],
        practicals: [
          "Assembly tools usage",
          "Annotation techniques",
          "Quality check"
        ]
      },
      {
        code: "BI 508",
        name: "Computer Programming in Bioinformatics",
        credits: "2+1",
        objective: "Train in programming and computational skills for bioinformatics workflows.",
        units: [
          {
            title: "Unit I",
            content: ["BioJava, Python basics, BioPython"]
          },
          {
            title: "Unit II",
            content: ["BioPerl: SeqIO, SearchIO, LiveSeq, Tree"]
          },
          {
            title: "Unit III",
            content: ["OpenMP & MPI: Clauses, synchronization, hybrid programming"]
          },
          {
            title: "Unit IV",
            content: ["CUDA: GPU computing basics"]
          }
        ],
        practicals: [
          "BioPerl, OpenMP, MPI",
          "HPC job scheduling",
          "CUDA usage"
        ]
      },
      {
        code: "MICRO 512",
        name: "Cyanobacterial & Algal Biotechnology",
        credits: "2+0",
        objective: "Explore cyanobacteria and algae in agriculture, energy, and biotechnology.",
        units: [
          {
            title: "Block 1",
            content: ["Ecology, evolution, classification"]
          },
          {
            title: "Block 2",
            content: [
              "Pigments, photosynthesis, nitrogen metabolism",
              "Cultivation: culture vessels, photobioreactors, seaweed farming"
            ]
          },
          {
            title: "Block 3",
            content: [
              "Applications: fuels, biofertilizers, nutraceuticals",
              "Pollution control, bioremediation, climate relevance"
            ]
          }
        ]
      },
      {
        code: "PGS 503",
        name: "Intellectual Property & Its Management in Agriculture",
        credits: "1+0",
        objective: "Understand IPR systems, laws, and applications in biotechnology.",
        topics: [
          "TRIPS, Indian IPR Acts",
          "Patents, Copyrights, Trademarks, Plant Varieties",
          "Licensing, MTAs, collaborations"
        ],
        units: [
          {
            title: "IPR Overview",
            content: [
              "TRIPS agreement",
              "Indian IPR laws",
              "Patent applications"
            ]
          }
        ]
      },
      {
        code: "PGS 504",
        name: "Basic Concepts in Laboratory Techniques",
        credits: "0+1",
        objective: "Introduce lab tools, safety, and techniques.",
        practicals: [
          "Chemical handling, glassware",
          "Buffers, microscope, sterilization",
          "Tissue culture, viability tests"
        ],
        units: [
          {
            title: "Lab Safety",
            content: [
              "Chemical handling procedures",
              "Equipment usage",
              "Safety protocols"
            ]
          }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Semester III",
    totalCredits: "7+13 (20 Credit Hours)",
    subjects: [
      {
        code: "BI 504",
        name: "Biomolecular Modelling and Simulation",
        credits: "2+1",
        objective: "Understand theoretical and practical concepts in biomolecular modeling and molecular simulation.",
        units: [
          {
            title: "Unit I",
            content: ["Homology modeling, loop building, ab initio, threading, CASP"]
          },
          {
            title: "Unit II",
            content: ["Energy minimization, torsional/Cartesian space, Ramachandran plot"]
          },
          {
            title: "Unit III",
            content: ["Force fields, solvation, Monte Carlo, Replica exchange, membrane sim"]
          },
          {
            title: "Unit IV",
            content: ["Optimization: Steepest descent, conjugate gradient, Newton-Raphson"]
          }
        ],
        practicals: [
          "PyMOL, SwissPDB, Modeller, SWISS-MODEL",
          "Tinker, docking, RMSD, simulation"
        ]
      },
      {
        code: "BI 505",
        name: "Transcriptomics and Metagenomics",
        credits: "2+1",
        objective: "Learn tools and analysis for transcriptomic and metagenomic data.",
        units: [
          {
            title: "Unit I",
            content: ["Microarrays, RNA-seq, ChIP-Seq, ESTs"]
          },
          {
            title: "Unit II",
            content: ["Annotation, microbial profiling, metabolic reconstruction"]
          },
          {
            title: "Unit III",
            content: ["AL, EC, LCS, SANE comparison, HGT"]
          },
          {
            title: "Unit IV",
            content: ["Shotgun sequencing, single-cell, metatranscriptomics"]
          }
        ],
        practicals: [
          "Expression data analysis",
          "Microbial community analysis",
          "Annotation tools"
        ]
      },
      {
        code: "BI 506",
        name: "Biological Data Management",
        credits: "2+1",
        objective: "Understand biological databases, data handling, and security.",
        units: [
          {
            title: "Unit I",
            content: ["DBMS overview, architecture, data models"]
          },
          {
            title: "Unit II",
            content: ["Relational DB, keys, integrity, normalization (1NF–5NF)"]
          },
          {
            title: "Unit III",
            content: ["SQL operations and queries"]
          },
          {
            title: "Unit IV",
            content: ["Data curation, NoSQL, big data, security, visualization"]
          }
        ],
        practicals: [
          "Data modeling, SQL",
          "Unstructured DB, visualization and ETL pipelines"
        ]
      },
      {
        code: "BI 500",
        name: "Minor Research",
        credits: "0+10",
        objective: "Initiate research work under supervision.",
        deliverables: ["Review, objectives, analysis, partial results"],
        units: []
      },
      {
        code: "PGS 505",
        name: "Agricultural Research, Ethics & Rural Development",
        credits: "1+0",
        objective: "Understand global/national agricultural research, ethics, and rural programs.",
        units: [
          {
            title: "Unit I",
            content: ["CGIAR, IARC, NARS, food security"]
          },
          {
            title: "Unit II",
            content: ["Research ethics and safety"]
          },
          {
            title: "Unit III",
            content: ["Rural programs: IRDP, PRIs, NGOs"]
          }
        ]
      }
    ]
  },
  {
    id: 4,
    name: "Semester IV",
    totalCredits: "0+21 (21 Credit Hours)",
    subjects: [
      {
        code: "BI 599",
        name: "Seminar",
        credits: "0+1",
        objective: "Improve scientific presentation and communication skills.",
        activities: [
          "Topic selection, slide/poster preparation",
          "Oral presentation",
          "Peer feedback"
        ],
        units: [
          {
            title: "Presentation Skills",
            content: [
              "Topic selection",
              "Slide preparation",
              "Oral presentation techniques"
            ]
          }
        ]
      },
      {
        code: "BI 500",
        name: "Major Research",
        credits: "0+20",
        objective: "Conduct full-fledged research in a chosen area.",
        deliverables: ["Thesis, analysis, conclusions, viva/presentation"],
        units: [
          {
            title: "Research Methodology",
            content: [
              "Literature review",
              "Research design",
              "Data collection and analysis",
              "Thesis writing"
            ]
          }
        ]
      }
    ]
  }
];