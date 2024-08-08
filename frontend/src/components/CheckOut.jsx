import React, { useState, useEffect } from 'react';
import { useAuth } from '../../utils/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Proceed from './Proceed';
import { toast } from 'sonner';

const CheckoutPage = () => {
  const accessToken = localStorage.getItem('accessToken');
  const [loading, setLoading] = useState(false);
  const { Cart } = useAuth();
  const [address, setAddress] = useState({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    phoneNumber: '',
  });

  const total = Cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    const extractAddressOfUser = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/users/fetchadd', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setAddress(data.data || {
          fullName: '',
          addressLine1: '',
          addressLine2: '',
          city: '',
          state: '',
          country: '',
          postalCode: '',
          phoneNumber: '',
        });

      } catch (error) {
        console.error('Failed to fetch address:', error);
      }
    };

    extractAddressOfUser();
  }, [accessToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/v1/users/updateaddress', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(address),
      });

      if (response.ok) {
        toast.success("Address Updated");
      } else {
        console.error('Failed to update address');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/v1/users/addaddress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(address),
      });

      if (response.ok) {
        toast.success("Address Added");
      } else {
        console.error('Failed to add address');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-2/3 bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <form className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={address.fullName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="addressLine1">Address Line 1</Label>
                <Input
                  id="addressLine1"
                  name="addressLine1"
                  value={address.addressLine1}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="addressLine2">Address Line 2</Label>
                <Input
                  id="addressLine2"
                  name="addressLine2"
                  value={address.addressLine2}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={address.city}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  value={address.state}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  value={address.country}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  value={address.postalCode}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={address.phoneNumber}
                  onChange={handleChange}
                />
              </div>
            </div>
            <Button onClick={handleSubmit} className="w-full mt-4">
              {loading ? 'Loading...' : 'Add Address'}
            </Button>
          </form>
        </div>
        <div className="w-full md:w-1/3 bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
          <div className="flex flex-col gap-4">
            {Cart.map((item) => (
              <div key={item._id} className="flex justify-between items-center p-4 border rounded">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>{item.price.toFixed(2)} PKR</p>
                </div>
                <div>
                  <p className="font-semibold">QTY: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
            <div className="flex items-center">
              <input
                type="radio"
                id="cashOnDelivery"
                name="paymentMethod"
                value="cashOnDelivery"
                defaultChecked
              />
              <label htmlFor="cashOnDelivery" className="ml-2">Cash on Delivery</label>
            </div>
            <Proceed />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

