// price_calculator.cpp - Advanced price calculations for JOKIINAJA
#include <iostream>
#include <string>
#include <map>
#include <cmath>
#include <chrono>
#include <iomanip>
#include <sstream>

using namespace std;

// Price structure
struct PriceResult {
    double base_price;
    int quantity;
    double subtotal;
    double express_fee;
    double discount;
    double final_total;
    bool is_express;
    string service_type;
};

// Service price table
class ServicePriceTable {
private:
    map<string, double> base_prices = {
        {"makalah", 7000.0},
        {"powerpoint", 15000.0},
        {"ringkasan", 15000.0},
        {"jurnal", 15000.0},
        {"programming", 350000.0},
        {"analisis", 150000.0}
    };
    
    map<string, double> express_fees = {
        {"makalah", 35000.0},
        {"powerpoint", 35000.0},
        {"ringkasan", 35000.0},
        {"jurnal", 50000.0},
        {"programming", 100000.0},
        {"analisis", 75000.0}
    };
    
public:
    double get_base_price(const string& service_type) {
        return base_prices.count(service_type) ? base_prices[service_type] : 0.0;
    }
    
    double get_express_fee(const string& service_type) {
        return express_fees.count(service_type) ? express_fees[service_type] : 0.0;
    }
    
    bool is_fixed_price(const string& service_type) {
        return service_type == "programming" || service_type == "analisis";
    }
};

// Coupon validator
class CouponValidator {
private:
    struct Coupon {
        string code;
        string type; // "percentage" or "fixed"
        double value;
        bool valid_for_express;
    };
    
    map<string, Coupon> valid_coupons = {
        {"WELCOME10", {"WELCOME10", "percentage", 10.0, true}},
        {"STUDENT15", {"STUDENT15", "percentage", 15.0, true}},
        {"FAST5", {"FAST5", "percentage", 5.0, false}} // Only for express orders
    };
    
public:
    double calculate_discount(const string& coupon_code, double total, bool is_express) {
        if (valid_coupons.count(coupon_code) == 0) {
            return 0.0;
        }
        
        Coupon coupon = valid_coupons[coupon_code];
        
        // Check if FAST5 is used on non-express order
        if (coupon_code == "FAST5" && !is_express) {
            return 0.0;
        }
        
        if (coupon.type == "percentage") {
            return total * (coupon.value / 100.0);
        } else if (coupon.type == "fixed") {
            return coupon.value;
        }
        
        return 0.0;
    }
    
    bool is_valid_coupon(const string& coupon_code) {
        return valid_coupons.count(coupon_code) > 0;
    }
};

// Price calculator
class PriceCalculator {
private:
    ServicePriceTable price_table;
    CouponValidator coupon_validator;
    
public:
    PriceResult calculate_price(
        const string& service_type,
        int quantity,
        bool is_express = false,
        const string& coupon_code = ""
    ) {
        PriceResult result;
        result.service_type = service_type;
        result.quantity = quantity;
        result.is_express = is_express;
        
        // Get base price
        result.base_price = price_table.get_base_price(service_type);
        
        // Calculate subtotal
        if (price_table.is_fixed_price(service_type)) {
            result.subtotal = result.base_price;
        } else {
            result.subtotal = result.base_price * quantity;
        }
        
        // Add express fee
        if (is_express) {
            result.express_fee = price_table.get_express_fee(service_type);
        } else {
            result.express_fee = 0.0;
        }
        
        double total_before_discount = result.subtotal + result.express_fee;
        
        // Apply coupon discount
        if (!coupon_code.empty()) {
            result.discount = coupon_validator.calculate_discount(
                coupon_code, total_before_discount, is_express
            );
        } else {
            result.discount = 0.0;
        }
        
        // Calculate final total
        result.final_total = total_before_discount - result.discount;
        
        // Ensure non-negative total
        if (result.final_total < 0) {
            result.final_total = 0.0;
        }
        
        return result;
    }
    
    // Calculate estimated completion time
    string calculate_estimated_time(const string& service_type, bool is_express) {
        map<string, int> normal_times = {
            {"makalah", 72},      // 72 hours (3 days)
            {"powerpoint", 48},   // 48 hours (2 days)
            {"ringkasan", 24},    // 24 hours (1 day)
            {"jurnal", 96},       // 96 hours (4 days)
            {"programming", 120}, // 120 hours (5 days)
            {"analisis", 96}      // 96 hours (4 days)
        };
        
        int hours = normal_times[service_type];
        
        if (is_express) {
            if (service_type == "programming" || service_type == "analisis") {
                hours = 12;
            } else {
                hours = 6;
            }
        }
        
        if (hours < 24) {
            return to_string(hours) + " jam";
        } else {
            return to_string(hours / 24) + " hari";
        }
    }
    
    // Calculate bulk discount
    double calculate_bulk_discount(int quantity, double total) {
        if (quantity >= 50) {
            return total * 0.15; // 15% discount for 50+ items
        } else if (quantity >= 20) {
            return total * 0.10; // 10% discount for 20+ items
        } else if (quantity >= 10) {
            return total * 0.05; // 5% discount for 10+ items
        }
        return 0.0;
    }
};

// Formatter for currency
class CurrencyFormatter {
public:
    static string format_idr(double amount) {
        stringstream ss;
        ss.imbue(locale(""));
        ss << fixed << setprecision(0) << "Rp " << amount;
        
        string result = ss.str();
        
        // Replace commas with dots for IDR format
        size_t pos = 0;
        while ((pos = result.find(',')) != string::npos) {
            result.replace(pos, 1, ".");
        }
        
        return result;
    }
    
    static string format_price_breakdown(const PriceResult& result) {
        stringstream ss;
        
        ss << "=== RINCIAN HARGA ===\n";
        ss << "Layanan: " << result.service_type << "\n";
        ss << "Jumlah: " << result.quantity << " unit\n";
        ss << "Harga dasar: " << format_idr(result.base_price) << " per unit\n";
        ss << "Subtotal: " << format_idr(result.subtotal) << "\n";
        
        if (result.is_express) {
            ss << "Biaya express: " << format_idr(result.express_fee) << "\n";
        }
        
        if (result.discount > 0) {
            ss << "Diskon: -" << format_idr(result.discount) << "\n";
        }
        
        ss << "=====================\n";
        ss << "TOTAL: " << format_idr(result.final_total) << "\n";
        
        return ss.str();
    }
};

// Main demo function
int main() {
    cout << "=== JOKIINAJA PRICE CALCULATOR ===\n\n";
    
    PriceCalculator calculator;
    CurrencyFormatter formatter;
    
    // Example 1: Normal order
    cout << "Contoh 1: Order Makalah Normal\n";
    PriceResult result1 = calculator.calculate_price("makalah", 20, false);
    cout << formatter.format_price_breakdown(result1) << endl;
    
    // Example 2: Express order with coupon
    cout << "\nContoh 2: Order PowerPoint Express dengan Kupon\n";
    PriceResult result2 = calculator.calculate_price("powerpoint", 15, true, "WELCOME10");
    cout << formatter.format_price_breakdown(result2) << endl;
    cout << "Estimasi waktu: " << calculator.calculate_estimated_time("powerpoint", true) << endl;
    
    // Example 3: Programming project
    cout << "\nContoh 3: Project Programming Express\n";
    PriceResult result3 = calculator.calculate_price("programming", 1, true, "STUDENT15");
    cout << formatter.format_price_breakdown(result3) << endl;
    cout << "Estimasi waktu: " << calculator.calculate_estimated_time("programming", true) << endl;
    
    // Example 4: Bulk order with bulk discount
    cout << "\nContoh 4: Order Makalah Bulk (50 halaman)\n";
    PriceResult result4 = calculator.calculate_price("makalah", 50, false);
    double bulk_discount = calculator.calculate_bulk_discount(50, result4.final_total);
    result4.final_total -= bulk_discount;
    result4.discount += bulk_discount;
    cout << formatter.format_price_breakdown(result4) << endl;
    
    return 0;
}

// Additional utility functions
namespace JokiUtils {
    // Calculate profit margin
    double calculate_profit_margin(double cost_price, double selling_price) {
        if (cost_price == 0) return 0.0;
        return ((selling_price - cost_price) / cost_price) * 100.0;
    }
    
    // Calculate deadline
    chrono::system_clock::time_point calculate_deadline(
        chrono::system_clock::time_point start_time,
        const string& service_type,
        bool is_express
    ) {
        int hours;
        
        if (is_express) {
            if (service_type == "programming" || service_type == "analisis") {
                hours = 12;
            } else {
                hours = 6;
            }
        } else {
            map<string, int> normal_hours = {
                {"makalah", 72},
                {"powerpoint", 48},
                {"ringkasan", 24},
                {"jurnal", 96},
                {"programming", 120},
                {"analisis", 96}
            };
            hours = normal_hours[service_type];
        }
        
        return start_time + chrono::hours(hours);
    }
    
    // Generate order ID
    string generate_order_id(const string& service_code) {
        auto now = chrono::system_clock::now();
        auto timestamp = chrono::duration_cast<chrono::seconds>(now.time_since_epoch()).count();
        
        stringstream ss;
        ss << "JKI" << service_code << timestamp;
        
        return ss.str();
    }
}

// Test function
void run_tests() {
    PriceCalculator calc;
    
    cout << "=== TEST CALCULATIONS ===\n";
    
    // Test 1: Basic calculation
    PriceResult test1 = calc.calculate_price("makalah", 10, false);
    assert(fabs(test1.final_total - 70000.0) < 0.01);
    cout << "Test 1 PASSED: Makalah 10 hal = " << test1.final_total << endl;
    
    // Test 2: Express calculation
    PriceResult test2 = calc.calculate_price("makalah", 10, true);
    assert(fabs(test2.final_total - 105000.0) < 0.01);
    cout << "Test 2 PASSED: Makalah express 10 hal = " << test2.final_total << endl;
    
    // Test 3: With coupon
    PriceResult test3 = calc.calculate_price("makalah", 10, true, "WELCOME10");
    assert(fabs(test3.final_total - 94500.0) < 0.01);
    cout << "Test 3 PASSED: With WELCOME10 coupon = " << test3.final_total << endl;
    
    // Test 4: Programming project
    PriceResult test4 = calc.calculate_price("programming", 1, false);
    assert(fabs(test4.final_total - 350000.0) < 0.01);
    cout << "Test 4 PASSED: Programming project = " << test4.final_total << endl;
    
    cout << "All tests passed!\n";
}

/*
To compile and run:
g++ -std=c++11 -o price_calculator price_calculator.cpp
./price_calculator
*/