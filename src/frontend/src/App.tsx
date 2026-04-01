import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  Download,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Phone,
  Printer,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitQuoteRequest } from "./hooks/useQueries";

const PRODUCTS = [
  {
    name: "Mug Printing",
    description:
      "Custom ceramic mugs with your design. Perfect for gifts, promotions, and school events.",
    priceText: "From ₱99",
    image: "/assets/generated/mug-printing.dim_400x300.jpg",
    category: "Merchandise",
  },
  {
    name: "School Uniform Printing",
    description:
      "Embroidered and printed school uniforms with custom logos and school names.",
    priceText: "From ₱299",
    image: "/assets/generated/uniform-printing.dim_400x300.jpg",
    category: "School",
  },
  {
    name: "School Pen Printing",
    description:
      "Branded pens for schools and organizations with custom text and logos.",
    priceText: "From ₱15",
    image: "/assets/generated/pen-printing.dim_400x300.jpg",
    category: "School",
  },
  {
    name: "School ID Card Printing",
    description:
      "Professional laminated ID cards for students, staff, and organizations.",
    priceText: "From ₱49",
    image: "/assets/generated/id-card-printing.dim_400x300.jpg",
    category: "School",
  },
  {
    name: "T-Shirt Printing",
    description:
      "Full color sublimation and screen printing on t-shirts for any occasion.",
    priceText: "From ₱199",
    image: "/assets/generated/tshirt-printing.dim_400x300.jpg",
    category: "Apparel",
  },
  {
    name: "Custom Printing",
    description:
      "Business cards, flyers, brochures, and any custom print materials.",
    priceText: "From ₱29",
    image: "/assets/generated/custom-printing.dim_400x300.jpg",
    category: "Marketing",
  },
  {
    name: "Tote Bag Printing",
    description:
      "Branded eco-friendly tote bags with custom full-color printing.",
    priceText: "From ₱149",
    image: "/assets/generated/tote-printing.dim_400x300.jpg",
    category: "Merchandise",
  },
  {
    name: "Awards & Frames",
    description:
      "Custom plaques, trophies, certificates and frames for school events.",
    priceText: "From ₱249",
    image: "/assets/generated/award-printing.dim_400x300.jpg",
    category: "Awards",
  },
];

function NavBar({ onQuoteClick }: { onQuoteClick: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "#0B2F4A" }}
            >
              <Printer className="w-5 h-5 text-white" />
            </div>
            <div className="leading-tight">
              <div className="font-bold text-sm" style={{ color: "#0B2F4A" }}>
                AS-Printing
              </div>
              <div className="text-xs font-medium" style={{ color: "#F28C28" }}>
                Gallery
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {[
              { label: "Home", id: "home" },
              { label: "Catalog", id: "catalog" },
              { label: "Our Services", id: "catalog" },
              { label: "Mug Printing", id: "catalog" },
              { label: "Uniform Printing", id: "catalog" },
              { label: "ID Cards", id: "catalog" },
              { label: "Contact", id: "contact" },
            ].map((item) => (
              <button
                type="button"
                key={item.label}
                onClick={() => scrollTo(item.id)}
                data-ocid={`nav.${item.label
                  .toLowerCase()
                  .replace(/[^a-z0-9]/g, "-")
                  .replace(/-+/g, "-")
                  .replace(/^-|-$/g, "")}.link`}
                className="px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-gray-50"
                style={{ color: "#1B1F23" }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-2">
            <Button
              onClick={onQuoteClick}
              data-ocid="nav.quote.button"
              className="hidden sm:flex text-white font-semibold text-sm"
              style={{ backgroundColor: "#F28C28" }}
            >
              Request a Quote
            </Button>
            <button
              type="button"
              className="lg:hidden p-2 rounded-md"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 pb-4">
          {[
            { label: "Home", id: "home" },
            { label: "Catalog", id: "catalog" },
            { label: "Contact", id: "contact" },
          ].map((item) => (
            <button
              type="button"
              key={item.label}
              onClick={() => scrollTo(item.id)}
              className="block w-full text-left px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-50"
              style={{ color: "#1B1F23" }}
            >
              {item.label}
            </button>
          ))}
          <Button
            onClick={() => {
              onQuoteClick();
              setMenuOpen(false);
            }}
            className="w-full mt-2 text-white font-semibold"
            style={{ backgroundColor: "#F28C28" }}
          >
            Request a Quote
          </Button>
        </div>
      )}
    </header>
  );
}

function HeroSection({
  onCatalogClick,
  onDownloadPDF,
}: { onCatalogClick: () => void; onDownloadPDF: () => void }) {
  return (
    <section
      id="home"
      className="relative w-full min-h-[500px] flex items-center no-print"
      style={{
        backgroundImage:
          "url('/assets/generated/hero-products.dim_1200x500.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(11,47,74,0.78)" }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
            style={{ backgroundColor: "#F28C28", color: "white" }}
          >
            Professional Printing Services
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
            Premium Quality <br />
            <span style={{ color: "#F28C28" }}>Printing Solutions</span>
          </h1>
          <p className="text-gray-200 text-lg mb-8 leading-relaxed">
            Mugs, school uniforms, ID cards, pens, t-shirts and more. Custom
            printing for schools, businesses, and events.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={onCatalogClick}
              data-ocid="hero.catalog.button"
              size="lg"
              className="text-white font-semibold"
              style={{ backgroundColor: "#0B4A72" }}
            >
              View Catalog
            </Button>
            <Button
              onClick={onDownloadPDF}
              data-ocid="hero.download_pdf.button"
              size="lg"
              variant="outline"
              className="font-semibold border-white/40 text-white hover:bg-white/10"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Full Catalog PDF
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  index,
}: { product: (typeof PRODUCTS)[0]; index: number }) {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      data-ocid={`catalog.item.${index + 1}`}
      className="bg-white rounded-lg overflow-hidden shadow-card flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-semibold text-sm" style={{ color: "#1B1F23" }}>
            {product.name}
          </h3>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap ml-2"
            style={{ backgroundColor: "#FEF3E2", color: "#F28C28" }}
          >
            {product.priceText}
          </span>
        </div>
        <p
          className="text-xs leading-relaxed flex-1 mb-3"
          style={{ color: "#6B7280" }}
        >
          {product.description}
        </p>
        <div className="flex justify-end">
          <Button
            size="sm"
            onClick={scrollToContact}
            data-ocid={`catalog.item.${index + 1}.button`}
            className="text-xs text-white font-medium"
            style={{ backgroundColor: "#0B4A72" }}
          >
            Details
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function PrintCatalog() {
  return (
    <div id="print-catalog" className="hidden print:block p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold" style={{ color: "#0B2F4A" }}>
          AS-Printing Gallery
        </h1>
        <p className="text-gray-500 mt-1">
          Professional Printing Services Catalog
        </p>
        <hr className="my-4" />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "24px",
        }}
      >
        {PRODUCTS.map((product) => (
          <div
            key={product.name}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              overflow: "hidden",
              pageBreakInside: "avoid",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", height: "160px", objectFit: "cover" }}
            />
            <div style={{ padding: "16px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <h3
                  style={{
                    fontWeight: "600",
                    fontSize: "14px",
                    color: "#1B1F23",
                    margin: 0,
                  }}
                >
                  {product.name}
                </h3>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    color: "#F28C28",
                    whiteSpace: "nowrap",
                    marginLeft: "8px",
                  }}
                >
                  {product.priceText}
                </span>
              </div>
              <p
                style={{
                  fontSize: "12px",
                  color: "#6B7280",
                  marginTop: "6px",
                  marginBottom: 0,
                }}
              >
                {product.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center text-xs" style={{ color: "#6B7280" }}>
        <p>
          Contact us: info@asprinting.com | +63 912 345 6789 | Quezon City,
          Philippines
        </p>
        <p style={{ marginTop: "4px" }}>
          AS-Printing Gallery — All rights reserved
        </p>
      </div>
    </div>
  );
}

function CatalogSection({ onDownloadPDF }: { onDownloadPDF: () => void }) {
  return (
    <section id="catalog" className="py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 no-print">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: "#1B1F23" }}>
              Printing Products Catalog
            </h2>
            <p className="text-sm mt-1" style={{ color: "#6B7280" }}>
              Browse our full range of custom printing services
            </p>
          </div>
          <Button
            onClick={onDownloadPDF}
            data-ocid="catalog.export_pdf.button"
            className="text-white font-semibold"
            style={{ backgroundColor: "#0B2F4A" }}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Full Catalog (PDF)
          </Button>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.name} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { mutateAsync: submitQuote, isPending } = useSubmitQuoteRequest();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    productName: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.productName) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      await submitQuote({
        name: form.name,
        email: form.email,
        phone: form.phone,
        productName: form.productName,
        message: form.message,
        timestamp: BigInt(Date.now()),
      });
      toast.success("Quote request submitted! We'll contact you soon.");
      setForm({ name: "", email: "", phone: "", productName: "", message: "" });
    } catch {
      toast.error("Failed to submit. Please try again.");
    }
  };

  return (
    <section
      id="contact"
      className="py-14 no-print"
      style={{ backgroundColor: "#F3F5F7" }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold" style={{ color: "#1B1F23" }}>
            Request a Quote
          </h2>
          <p className="text-sm mt-2" style={{ color: "#6B7280" }}>
            Fill out the form below and we'll get back to you within 24 hours.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-card p-6 sm:p-8">
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            data-ocid="contact.dialog"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="name"
                  className="text-sm font-medium"
                  style={{ color: "#1B1F23" }}
                >
                  Full Name *
                </Label>
                <Input
                  id="name"
                  data-ocid="contact.name.input"
                  placeholder="Juan dela Cruz"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label
                  htmlFor="email"
                  className="text-sm font-medium"
                  style={{ color: "#1B1F23" }}
                >
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  data-ocid="contact.email.input"
                  placeholder="juan@email.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="phone"
                  className="text-sm font-medium"
                  style={{ color: "#1B1F23" }}
                >
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  data-ocid="contact.phone.input"
                  placeholder="+63 912 345 6789"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, phone: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label
                  htmlFor="product"
                  className="text-sm font-medium"
                  style={{ color: "#1B1F23" }}
                >
                  Product Interest *
                </Label>
                <Select
                  value={form.productName}
                  onValueChange={(val) =>
                    setForm((p) => ({ ...p, productName: val }))
                  }
                >
                  <SelectTrigger
                    id="product"
                    data-ocid="contact.product.select"
                    className="mt-1"
                  >
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {PRODUCTS.map((p) => (
                      <SelectItem key={p.name} value={p.name}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label
                htmlFor="message"
                className="text-sm font-medium"
                style={{ color: "#1B1F23" }}
              >
                Message / Details
              </Label>
              <Textarea
                id="message"
                data-ocid="contact.message.textarea"
                placeholder="Tell us about your printing needs, quantity, deadline, etc."
                value={form.message}
                onChange={(e) =>
                  setForm((p) => ({ ...p, message: e.target.value }))
                }
                className="mt-1 resize-none"
                rows={4}
              />
            </div>

            <Button
              type="submit"
              data-ocid="contact.submit.button"
              disabled={isPending}
              className="w-full text-white font-semibold text-base py-6"
              style={{ backgroundColor: "#F28C28" }}
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                  Submitting...
                </>
              ) : (
                "Submit Quote Request"
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="no-print"
      style={{ backgroundColor: "#0B2F4A", color: "white" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#F28C28" }}
              >
                <Printer className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-white">AS-Printing Gallery</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#94A3B8" }}>
              Your trusted partner for high-quality custom printing services.
              Serving schools, businesses, and organizations across the
              Philippines.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-white mb-3">Our Products</h4>
            <ul className="space-y-2">
              {PRODUCTS.slice(0, 5).map((p) => (
                <li key={p.name}>
                  <button
                    type="button"
                    onClick={() => {
                      document
                        .getElementById("catalog")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-sm transition-colors hover:text-white text-left"
                    style={{ color: "#94A3B8" }}
                  >
                    {p.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-3">Contact Info</h4>
            <div className="space-y-2">
              <div
                className="flex items-center gap-2 text-sm"
                style={{ color: "#94A3B8" }}
              >
                <Mail
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: "#F28C28" }}
                />
                <span>info@asprinting.com</span>
              </div>
              <div
                className="flex items-center gap-2 text-sm"
                style={{ color: "#94A3B8" }}
              >
                <Phone
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: "#F28C28" }}
                />
                <span>+63 912 345 6789</span>
              </div>
              <div
                className="flex items-start gap-2 text-sm"
                style={{ color: "#94A3B8" }}
              >
                <MapPin
                  className="w-4 h-4 flex-shrink-0 mt-0.5"
                  style={{ color: "#F28C28" }}
                />
                <span>123 Printing Ave, Quezon City, Philippines</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          <p className="text-xs" style={{ color: "#64748B" }}>
            © {year} AS-Printing Gallery. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "#64748B" }}>
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToCatalog = () => {
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster richColors position="top-right" />
      <NavBar onQuoteClick={scrollToContact} />
      <main className="flex-1">
        <HeroSection
          onCatalogClick={scrollToCatalog}
          onDownloadPDF={handleDownloadPDF}
        />
        <CatalogSection onDownloadPDF={handleDownloadPDF} />
        <ContactSection />
      </main>
      <Footer />
      {/* Hidden print-only catalog */}
      <PrintCatalog />
    </div>
  );
}
