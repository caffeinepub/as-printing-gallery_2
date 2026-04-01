# AS-Printing Gallery

## Current State
New project — no existing application files.

## Requested Changes (Diff)

### Add
- Full printing services catalog website with sections: Hero, Products Catalog, Footer
- Product categories: Mug Printing, School Uniform Printing, School Pen Printing, School ID Card Printing, plus Customized/General Printing
- PDF export button that generates and downloads a printable catalog PDF of all products
- Navigation bar with links to sections
- "Request a Quote" CTA

### Modify
N/A

### Remove
N/A

## Implementation Plan
1. Backend: simple actor with products data (name, description, category, price)
2. Frontend: full-page catalog with hero, product grid, PDF export using browser print/jsPDF
3. PDF generation: use `window.print()` with a print stylesheet, or jsPDF library to compile catalog
