import requests
import sys
from datetime import datetime
import json

class PsychologyWebsiteAPITester:
    def __init__(self, base_url="https://aigroz-psy.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_url}{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=30)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=30)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=30)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=30)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ PASSED - Status: {response.status_code}")
                try:
                    response_json = response.json()
                    print(f"   Response: {json.dumps(response_json, indent=2, default=str)[:200]}...")
                except:
                    print(f"   Response: {response.text[:200]}...")
            else:
                print(f"❌ FAILED - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")

            # Store test result
            self.test_results.append({
                'name': name,
                'method': method,
                'endpoint': endpoint,
                'expected_status': expected_status,
                'actual_status': response.status_code,
                'success': success,
                'response_text': response.text[:200] if response.text else None
            })

            return success, response.json() if success and response.text else {}, response

        except requests.exceptions.RequestException as e:
            print(f"❌ FAILED - Request Error: {str(e)}")
            self.test_results.append({
                'name': name,
                'method': method,
                'endpoint': endpoint,
                'expected_status': expected_status,
                'actual_status': None,
                'success': False,
                'error': str(e)
            })
            return False, {}, None

    def test_root_endpoint(self):
        """Test the root API endpoint"""
        return self.run_test(
            "Root API Endpoint",
            "GET",
            "/",
            200
        )

    def test_contact_form_submission(self):
        """Test contact form submission"""
        contact_data = {
            "nom": "Test User",
            "email": "test@example.com",
            "telephone": "079 123 45 67",
            "consultation_pour": "soi-meme",
            "situation": "Je traverse une période difficile et j'aimerais pouvoir discuter de mes préoccupations avec un professionnel.",
            "motif": "Stress et anxiété liés au travail"
        }
        
        return self.run_test(
            "Contact Form Submission",
            "POST",
            "/contact",
            200,
            data=contact_data
        )

    def test_contact_form_validation(self):
        """Test contact form validation with missing fields"""
        invalid_data = {
            "nom": "",  # Empty name should fail
            "email": "invalid-email",  # Invalid email
            "telephone": "123",  # Too short phone
        }
        
        return self.run_test(
            "Contact Form Validation (should fail)",
            "POST",
            "/contact",
            422,  # Unprocessable Entity for validation errors
            data=invalid_data
        )

    def test_get_contacts(self):
        """Test getting all contact requests"""
        return self.run_test(
            "Get All Contact Requests",
            "GET",
            "/contacts",
            200
        )

    def test_status_check_creation(self):
        """Test creating a status check"""
        status_data = {
            "client_name": "test_client"
        }
        
        return self.run_test(
            "Create Status Check",
            "POST",
            "/status",
            200,
            data=status_data
        )

    def test_get_status_checks(self):
        """Test getting all status checks"""
        return self.run_test(
            "Get All Status Checks",
            "GET",
            "/status",
            200
        )

    def test_nonexistent_endpoint(self):
        """Test a non-existent endpoint"""
        return self.run_test(
            "Non-existent Endpoint (should return 404)",
            "GET",
            "/nonexistent",
            404
        )

def main():
    print("🏥 Sophie Aigroz Psychology Website - Backend API Testing")
    print("=" * 60)
    
    # Setup
    tester = PsychologyWebsiteAPITester()
    
    # Run basic connectivity tests first
    print("\n📡 Testing API Connectivity...")
    root_success, _, _ = tester.test_root_endpoint()
    
    if not root_success:
        print("\n❌ Critical: Cannot connect to API. Backend may be down.")
        print("\n📊 Test Summary:")
        print(f"   Tests Run: {tester.tests_run}")
        print(f"   Tests Passed: {tester.tests_passed}")
        print(f"   Success Rate: {(tester.tests_passed/tester.tests_run)*100:.1f}%")
        return 1
    
    print("\n📝 Testing Contact Form API...")
    # Test valid contact form submission
    contact_success, contact_response, _ = tester.test_contact_form_submission()
    
    # Test form validation
    validation_success, _, _ = tester.test_contact_form_validation()
    
    print("\n📋 Testing Admin Endpoints...")
    # Test getting contacts
    get_contacts_success, _, _ = tester.test_get_contacts()
    
    print("\n🔍 Testing Status Check System...")
    # Test status checks
    status_create_success, _, _ = tester.test_status_check_creation()
    status_get_success, _, _ = tester.test_get_status_checks()
    
    print("\n🚫 Testing Error Handling...")
    # Test non-existent endpoint
    error_success, _, _ = tester.test_nonexistent_endpoint()
    
    # Print detailed results
    print("\n" + "="*60)
    print("📊 DETAILED TEST RESULTS")
    print("="*60)
    
    for result in tester.test_results:
        status = "✅ PASS" if result['success'] else "❌ FAIL"
        print(f"{status} | {result['name']}")
        print(f"      {result['method']} {result['endpoint']} -> Expected: {result['expected_status']}, Got: {result.get('actual_status', 'ERROR')}")
        if 'error' in result:
            print(f"      Error: {result['error']}")
    
    # Print summary
    success_rate = (tester.tests_passed/tester.tests_run)*100 if tester.tests_run > 0 else 0
    print(f"\n📈 FINAL SUMMARY:")
    print(f"   Tests Run: {tester.tests_run}")
    print(f"   Tests Passed: {tester.tests_passed}")
    print(f"   Success Rate: {success_rate:.1f}%")
    
    # Determine if critical functionality works
    critical_tests_passed = root_success and contact_success
    if critical_tests_passed:
        print(f"\n✅ CRITICAL FUNCTIONALITY: Working")
        print(f"   - API is accessible")
        print(f"   - Contact form submission works")
    else:
        print(f"\n❌ CRITICAL FUNCTIONALITY: Issues detected")
        if not root_success:
            print(f"   - API connectivity failed")
        if not contact_success:
            print(f"   - Contact form submission failed")
    
    return 0 if critical_tests_passed else 1

if __name__ == "__main__":
    sys.exit(main())