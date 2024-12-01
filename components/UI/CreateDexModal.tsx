import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

interface CreateDexModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: (data: any) => void;
}

interface DexFormData {
  name: string;
  symbol: string;
  initialLiquidity: string;
  tradingFee: string;
  description: string;
}

const CreateDexModal: React.FC<CreateDexModalProps> = ({ isOpen, onClose, onApprove }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<DexFormData>({
    name: '',
    symbol: '',
    initialLiquidity: '',
    tradingFee: '',
    description: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      // Simulate Keplr transaction
      if (window.keplr) {
        const chainId = "cosmoshub-4";
        await window.keplr.enable(chainId);
        
        // Get the offline signer
        const offlineSigner = window.keplr.getOfflineSigner(chainId);
        const accounts = await offlineSigner.getAccounts();
        
        // Simulate a transaction message
        const msg = {
          typeUrl: "/cosmos.bank.v1beta1.MsgSend",
          value: {
            fromAddress: accounts[0].address,
            toAddress: accounts[0].address, // In real implementation, this would be contract address
            amount: [{
              denom: "uatom",
              amount: "0" // This is just a simulation
            }]
          }
        };

        // Show the transaction in Keplr
        try {
          await window.keplr.signAmino(
            chainId,
            accounts[0].address,
            {
              chain_id: chainId,
              account_number: "0",
              sequence: "0",
              fee: {
                amount: [{
                  denom: "uatom",
                  amount: "5000"
                }],
                gas: "200000"
              },
              msgs: [msg],
              memo: `Create DEX: ${formData.name}`
            }
          );

          // If transaction is approved, proceed with DEX creation
          onApprove(formData);
          onClose();
          setStep(1);
          setFormData({
            name: '',
            symbol: '',
            initialLiquidity: '',
            tradingFee: '',
            description: ''
          });
        } catch (error) {
          console.error("Transaction rejected:", error);
          alert("Transaction was rejected. DEX creation cancelled.");
        }
      }
    } catch (error) {
      console.error("Failed to create DEX:", error);
      alert("Failed to create DEX. Please try again.");
    }
  };

  const handleNext = () => {
    if (step === 1 && formData.name && formData.symbol) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ModalContent
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <ModalHeader>
          <h2>{step === 1 ? 'Create New DEX' : 'Review & Approve'}</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>

        <ModalBody>
          <AnimatePresence mode='wait'>
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
              >
                <FormGroup>
                  <FormLabel>DEX Name</FormLabel>
                  <FormInput
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter DEX name"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Token Symbol</FormLabel>
                  <FormInput
                    name="symbol"
                    value={formData.symbol}
                    onChange={handleInputChange}
                    placeholder="e.g., IST"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Initial Liquidity</FormLabel>
                  <FormInput
                    name="initialLiquidity"
                    value={formData.initialLiquidity}
                    onChange={handleInputChange}
                    placeholder="Enter amount"
                    type="number"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Trading Fee (%)</FormLabel>
                  <FormInput
                    name="tradingFee"
                    value={formData.tradingFee}
                    onChange={handleInputChange}
                    placeholder="e.g., 0.3"
                    type="number"
                    step="0.1"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Description</FormLabel>
                  <FormTextarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your DEX"
                  />
                </FormGroup>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
              >
                <ReviewSection>
                  <ReviewItem>
                    <ReviewLabel>DEX Name:</ReviewLabel>
                    <ReviewValue>{formData.name}</ReviewValue>
                  </ReviewItem>
                  <ReviewItem>
                    <ReviewLabel>Token Symbol:</ReviewLabel>
                    <ReviewValue>{formData.symbol}</ReviewValue>
                  </ReviewItem>
                  <ReviewItem>
                    <ReviewLabel>Initial Liquidity:</ReviewLabel>
                    <ReviewValue>{formData.initialLiquidity}</ReviewValue>
                  </ReviewItem>
                  <ReviewItem>
                    <ReviewLabel>Trading Fee:</ReviewLabel>
                    <ReviewValue>{formData.tradingFee}%</ReviewValue>
                  </ReviewItem>
                  <ReviewItem>
                    <ReviewLabel>Description:</ReviewLabel>
                    <ReviewValue>{formData.description}</ReviewValue>
                  </ReviewItem>
                </ReviewSection>
                <InfoText>
                  Please review the details above. Clicking "Approve" will open Keplr wallet for transaction signing.
                </InfoText>
              </motion.div>
            )}
          </AnimatePresence>
        </ModalBody>

        <ModalFooter>
          {step === 2 && (
            <BackButton onClick={handleBack}>
              Back
            </BackButton>
          )}
          <ActionButton
            onClick={step === 1 ? handleNext : handleSubmit}
            disabled={step === 1 && (!formData.name || !formData.symbol)}
          >
            {step === 1 ? 'Next' : 'Approve'}
          </ActionButton>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background: #111;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  position: relative;
  color: white;
`;

const ModalHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #222;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0;
    font-size: 1.5rem;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #888;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: white;
  }
`;

const ModalBody = styled.div`
  padding: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #888;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #333;
  border-radius: 6px;
  background: #222;
  color: white;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: white;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #333;
  border-radius: 6px;
  background: #222;
  color: white;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: white;
  }
`;

const ModalFooter = styled.div`
  padding: 1.5rem;
  border-top: 1px solid #222;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const ActionButton = styled.button<{ disabled?: boolean }>`
  background: white;
  color: black;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  transition: all 0.2s ease;

  &:hover {
    opacity: ${props => props.disabled ? 0.5 : 0.9};
  }
`;

const BackButton = styled.button`
  background: #222;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #333;
  }
`;

const ReviewSection = styled.div`
  background: #222;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
`;

const ReviewItem = styled.div`
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ReviewLabel = styled.div`
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
`;

const ReviewValue = styled.div`
  color: white;
  font-size: 1rem;
`;

const InfoText = styled.p`
  color: #888;
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.5;
`;

export default CreateDexModal;
